import numpy as np
from config import LSTM_UNITS
from keras.models import Sequential
from keras.layers import LSTM, Dense

class Model:
    
    def __init__(self,input_shape):
        """
        Defines an LSTM model for time series prediction.
        """
        self.model = Sequential()
        self.model.add(LSTM(LSTM_UNITS, input_shape=input_shape, return_sequences=True))
        self.model.add(LSTM(LSTM_UNITS, return_sequences=False))
        self.model.add(Dense(1))
        self.model.compile(loss='mean_squared_error', optimizer='adam')

    def train_model(self,model, train_X, train_Y, num_epochs, batch_size):
        """
        Trains the given model on the given training data.
        """
        self.model.fit(train_X, train_Y, epochs=num_epochs, batch_size=batch_size, verbose=2)