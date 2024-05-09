import config
import multiprocessing
from model import Model
from preprocess import Preprocessing
from postprocess import Postprocessing
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def run_model(Preprocessing, Postprocessing, out_flag):
    
    # Load data
    Preprocessing = Preprocessing()
    if out_flag == 1:
        cols_to_use = ['date','rainfall','gwl']
        data = Preprocessing.load_data(config.DATA_FILE, cols_to_use)
    else:
        cols_to_use = ['date','rainfall','gwl','api']
        data = Preprocessing.load_data(config.DATA_FILE, cols_to_use)[['rainfall', 'api', 'gwl']]
        
    # Normalize data
    scaler = Preprocessing.normalize_data()[1]

    # Split data into training and testing sets
    Preprocessing.split_data(config.TRAIN_TEST_SPLIT_RATIO)

    # Reshape data for LSTM input
    train_X, test_X, train_Y, test_Y= Preprocessing.reshape_data()

    # Define LSTM model
    input_shp = (train_X.shape[1], train_X.shape[2])
    lstm = Model(input_shp)

    # Train model
    lstm.train_model(lstm, train_X, train_Y, config.NUM_EPOCHS, config.BATCH_SIZE)

    # Make predictions
    test_predict = lstm.model.predict(test_X)
    
    #---------------------------------------------
    if out_flag == 1:
        test_predict = np.reshape(test_predict, test_X.shape)
    else :
        test_X = np.reshape(test_X,(test_X.shape[0],test_X.shape[1]))
    predicted = np.concatenate((test_X, test_predict),axis=out_flag)

    # Inverse transform data
    Postprocessing = Postprocessing(scaler)
    if out_flag == 1:
        test_Y=np.reshape(test_Y,test_X.shape)
    else :
        test_Y=np.reshape(test_Y,(test_X.shape[0],1))
    
    #Combine test_X and test_Y_reshaped
    observed=np.concatenate((test_X,test_Y),axis=out_flag)
    
    predicted = predicted.reshape(-1, predicted.shape[-1])
    observed = observed.reshape(-1, observed.shape[-1])
    
    # Inverse transforming the data for plotting graph
    predict_unscaled, observed_unscaled = Postprocessing.inverse_transform_data(predicted, observed)

     # Homogenize- Create DataFrame
    df = pd.DataFrame()
    df['rainfall(mm)'] = data['rainfall'][Preprocessing.train_size:len(data)]
    if out_flag == 1:
        df['api'] = data['api'][Preprocessing.train_size:len(data)]
    df['ground_water_level(m)'] = observed_unscaled[:, out_flag]
    df['gwl_prd'] = predict_unscaled[:, out_flag]
    df.index = data.index[Preprocessing.train_size:]

    # Plot data
    if out_flag == 1:
        Postprocessing.plot_data(df, 'Rainfall & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)', (14, 0), str(out_flag))
    else :
        Postprocessing.plot_data(df, 'Rainfall, API & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)',(14,0), str(out_flag))
        