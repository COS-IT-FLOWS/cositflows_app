import config
import multiprocessing
import preprocess
from model import Model
from postprocess import Postprocessing
import pandas as pd
import numpy as np
import pickle

def run_model1(Preprocessing, Postprocessing):
    
    # Load data
    data = Preprocessing.load_data('Input/rf_api_90days.csv')
    print(data)
    
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
    test_predict = np.reshape(test_predict, test_X.shape)
    predicted = np.array((test_X, test_predict)).T

    # Inverse transform data
    Postprocessing = Postprocessing(scaler)
    test_Y= np.reshape(test_Y,test_X.shape)
    observed = np.array((test_X, test_Y)).T
    
    predicted = predicted.reshape(-1, predicted.shape[-1])
    observed = observed.reshape(-1, observed.shape[-1])
    
    print(observed.shape, predicted.shape)
    predict_unscaled, observed_unscaled = Postprocessing.inverse_transform_data(predicted, observed)

     # Create DataFrame
    df = pd.DataFrame()
    df['rainfall(mm)'] = data['rainfall'][Preprocessing.train_size:len(data)]
    df['ground_water_level(m)'] = observed_unscaled[:, 1]
    df['gwl_prd'] = predict_unscaled[:, 1]

    # Plot data
    Postprocessing.plot_data(df, 'Rainfall & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)', (14, 0))

def run_model2(Preprocessing, Postprocessing):
    
    # Load data
    data_with_date = Preprocessing.load_data(config.DATA_FILE)
    data = data_with_date[['rainfall', 'api', 'gwl']]
    print(data)

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
    test_predict = np.reshape(test_predict, test_X.shape)
    predicted = np.array((test_X, test_predict)).T

    # Inverse transform data
    Postprocessing = Postprocessing(scaler)
    test_Y= np.reshape(test_Y,test_X.shape)
    observed = np.array((test_X, test_Y)).T
    
    predicted = predicted.reshape(-1, predicted.shape[-1])
    observed = observed.reshape(-1, observed.shape[-1])
    
    print(observed.shape, predicted.shape)
    predict_unscaled,observed_unscaled = Postprocessing.inverse_transform_data(predicted,observed)

    # Create DataFrame
    df = pd.DataFrame()
    df['rainfall(mm)'] = data['rainfall'][Preprocessing.train_size:len(data)]
    df['api'] = data['api'][Preprocessing.train_size:len(data)]
    df['ground_water_level(m)'] = observed_unscaled[:, 2]
    df['gwl_prd'] = predict_unscaled[:, 2]
    df.index = data.index[Preprocessing.train_size:]

    # Plot data
    Postprocessing.plot_data(df, 'Rainfall, API & Groundwater Level', 'months', 'rainfall(mm)', 'ground_water_level(m)')

if __name__ == '__main__':
    Preprocessing = preprocess.Preprocessing(config.DATA_FILE)
    #run_model1(Preprocessing, Postprocessing)
    run_model2(Preprocessing, Postprocessing)
    
"""  with multiprocessing.get_context('spawn').Pool(2) as executor:
        executor.starmap(run_model1, [(Preprocessing,)])
        executor.starmap(run_model2, [(Preprocessing,)]) """
