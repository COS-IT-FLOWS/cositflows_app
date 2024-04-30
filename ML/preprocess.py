import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

class Preprocessing:
    
    def __init__(self, data_file):
        """
        Initializes the class with the given data file.
        """
        self.data = self.load_data(data_file)

    def load_data(self,data_file):
        """
        Loads the data from the given file and returns it as a pandas DataFrame.
        """
        data = pd.read_csv(data_file, index_col='date', usecols=['date','rainfall','gwl','api'])
        return data

    def normalize_data(self):
        """
        Normalizes the given data using StandardScaler.
        """
        scaler = StandardScaler()
        self.data_scaled = scaler.fit_transform(self.data)
        self.scaler = scaler
        return self.data_scaled, scaler

    def split_data(self, train_test_split_ratio):
        """
        Splits the given data into training and testing sets.
        """
        self.train_size = int(len(self.data_scaled) * train_test_split_ratio)
        test_size = len(self.data_scaled) - self.train_size
        self.train_data, self.test_data = self.data_scaled[0:self.train_size, :], self.data_scaled[self.train_size:len(self.data_scaled), :]

    def reshape_data(self):
        """
        Reshapes the given data for LSTM input.
        """
        self.train_X = np.reshape(self.train_data[:, :-1], (self.train_data.shape[0], self.train_data.shape[1] - 1, 1))
        self.test_X = np.reshape(self.test_data[:, :-1], (self.test_data.shape[0], self.test_data.shape[1] - 1, 1))
        self.train_Y = self.train_data[:, -1]
        self.test_Y = self.test_data[:, -1]
        return self.train_X, self.test_X, self.train_Y, self.test_Y