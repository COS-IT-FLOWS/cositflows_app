import numpy as np
from keras.models import Sequential # type: ignore
from keras.layers import LSTM, Dense, Bidirectional # type: ignore
import yaml

with open('config.yaml','r') as f:
    config = yaml.safe_load(f)
    
    
class LSTM_Model:
    
    def __init__(self,input_shape):
        """
        Defines an LSTM model for time series prediction.
        """
        self.model = Sequential()
        self.model.add(LSTM(config['app']['LSTM_UNITS'], input_shape=input_shape, return_sequences=True))
        self.model.add(LSTM(config['app']['LSTM_UNITS'], return_sequences=False))
        self.model.add(Dense(1))
        self.model.compile(loss='mean_squared_error', optimizer='adam')

    def train_model(self,model, train_X, train_Y, num_epochs, batch_size):
        """
        Trains the given model on the given training data.
        """
        self.model.fit(train_X, train_Y, epochs=num_epochs, batch_size=batch_size, verbose=0)
        
class LSTM_BI_Model:
    
    def __init__(self, input_shape):
        self.model.add(Bidirectional(LSTM(config['app']['LSTM_BI_UNITS'], return_sequences=True), input_shape=input_shape))
        self.model.add(Bidirectional(LSTM(config['app']['LSTM_BI_UNITS'], return_sequences=False)))
        self.model.add(Dense(1))
        self.model.compile(loss='mean_squared_error', optimizer='adam')
    
    def train_model(self, model, train_X, train_Y, num_epochs, batch_size):
        """
        Trains the given model on the given training data.
        """
        self.model.fit(train_X, train_Y, epochs=num_epochs, batch_size=batch_size, verbose=2)