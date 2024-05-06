import config
import multiprocessing
from model import Model
from preprocess import Preprocessing
from postprocess import Postprocessing
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def run_model1(Preprocessing, Postprocessing, out_flag):
    
    # Load data
    Preprocessing = Preprocessing()
    cols_to_use = ['date','rainfall','gwl']
    data = Preprocessing.load_data(config.DATA_FILE, cols_to_use)
    # print(data)
    
    # Normalize data
    data_scaled, scaler = Preprocessing.normalize_data()

    # Split data into training and testing sets
    Preprocessing.split_data(config.TRAIN_TEST_SPLIT_RATIO)

    # Reshape data for LSTM input
    train_X, test_X, train_Y, test_Y = Preprocessing.reshape_data()

    # Define LSTM model
    input_shp = (train_X.shape[1], train_X.shape[2])
    lstm = Model(input_shp)

    # Train model
    lstm.train_model(lstm, train_X, train_Y, config.NUM_EPOCHS, config.BATCH_SIZE)

    # Make predictions
    test_predict = lstm.model.predict(test_X)
    #print(test_predict.shape)
    
    test_predict = np.reshape(test_predict, test_X.shape)
    predicted = np.array((test_X, test_predict)).T

    # Inverse transform data
    Postprocessing = Postprocessing(scaler)
    test_Y= np.reshape(test_Y,test_X.shape)
    observed = np.array((test_X, test_Y)).T
    
    predicted = predicted.reshape(-1, predicted.shape[-1])
    observed = observed.reshape(-1, observed.shape[-1])
    
    # print(observed.shape, predicted.shape)
    predict_unscaled, observed_unscaled = Postprocessing.inverse_transform_data(predicted, observed)

     # Create DataFrame
    df = pd.DataFrame()
    df['rainfall(mm)'] = data['rainfall'][Preprocessing.train_size:len(data)]
    df['ground_water_level(m)'] = observed_unscaled[:, 1]
    df['gwl_prd'] = predict_unscaled[:, 1]

    # Plot data
    Postprocessing.plot_data(df, 'Rainfall & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)', (14, 0), str(out_flag))

def run_model2(Preprocessing, Postprocessing, out_flag):
    
    # Load data
    Preprocessing = Preprocessing()
    cols_to_use= ['date','rainfall','gwl','api']
    data_with_date = Preprocessing.load_data(config.DATA_FILE, cols_to_use)
    data = data_with_date[['rainfall', 'api', 'gwl']]
    # print(data)

    # Normalize data
    data_scaled,scaler = Preprocessing.normalize_data()

    # Split data into training and testing sets
    Preprocessing.split_data(config.TRAIN_TEST_SPLIT_RATIO)

    # Reshape data for LSTM input
    train_X, test_X, train_Y, test_Y = Preprocessing.reshape_data()

    # Define LSTM model
    input_shp = (train_X.shape[1], train_X.shape[2])
    lstm = Model(input_shp)

    # Train model
    lstm.train_model(lstm, train_X, train_Y, config.NUM_EPOCHS, config.BATCH_SIZE)

    # Make predictions
    test_predict = lstm.model.predict(test_X)
    
    # Combine test_X and test_predict_reshaped
    test_X = np.reshape(test_X,(test_X.shape[0],test_X.shape[1]))
    # print(test_X.shape)
    predicted = np.concatenate((test_X, test_predict), axis=1)
    # print(predicted.shape)

    # Inverse transform data
    Postprocessing = Postprocessing(scaler)
    test_Y = np.reshape(test_Y, (test_X.shape[0], 1))
    # print(test_Y.shape)
    
    # Combine test_X and test_Y_reshaped
    observed = np.concatenate((test_X, test_Y), axis=1)
    # print(observed.shape)

    # Reshape predicted and observed arrays
    # predicted = predicted.reshape(-1, predicted.shape[-1])
    # observed = observed.reshape(-1, observed.shape[-1])

    # print(observed.shape, predicted.shape)
    predict_unscaled, observed_unscaled = Postprocessing.inverse_transform_data(predicted, observed)

    # Create DataFrame
    df = pd.DataFrame()
    df['rainfall(mm)'] = data['rainfall'][Preprocessing.train_size:len(data)]
    df['api'] = data['api'][Preprocessing.train_size:len(data)]
    df['ground_water_level(m)'] = observed_unscaled[:, 2]
    df['gwl_prd'] = predict_unscaled[:, 2]
    df.index = data.index[Preprocessing.train_size:]

    # Plot data
    Postprocessing.plot_data(df, 'Rainfall, API & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)',(14,0), str(out_flag))

def parallelize(run_model,Preprocessing,Postprocessing,out_flag):
    run_model(Preprocessing,Postprocessing,out_flag)
    
    
if __name__ == '__main__':
    # run_model1(Preprocessing, Postprocessing)
    # run_model2(Preprocessing, Postprocessing)
    
    with multiprocessing.get_context('spawn').Pool(4) as executor:
        # executor.starmap(run_model2, [(Preprocessing,Postprocessing, 1), (Preprocessing, Postprocessing, 2)])
        executor.starmap(parallelize, [(run_model1,Preprocessing,Postprocessing, 1), (run_model2,Preprocessing, Postprocessing, 2)])
        # executor.starmap(run_model2, [(Preprocessing,Postprocessing, 2)])
        # executor.starmap(run_model1, [(Preprocessing,Postprocessing, 3)])
        # executor.starmap(run_model2, [(Preprocessing,Postprocessing, 4)])  
