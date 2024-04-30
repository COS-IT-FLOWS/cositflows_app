import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import matplotlib.dates as dates
from sklearn.preprocessing import StandardScaler

class Postprocessing:
    
    def __init__(self,scaler):
        self.scaler = scaler
        
    def inverse_transform_data(self, predict, observed):
        """
        Inverse transforms the given predict and observed data using the given scaler.
        """
        predict_unscaled = self.scaler.inverse_transform(predict)
        observed_unscaled = self.scaler.inverse_transform(observed)
        return predict_unscaled, observed_unscaled

    def plot_data(self, df, title, xlabel, ylabel1, ylabel2, ylim2, out_path):
        """
        Plots the given data using matplotlib.
        """
        color = 'tab:blue'
        fig, ax1 = plt.subplots()
        ax1.set_xlabel(xlabel)
        ax1.set_ylabel(ylabel1, color=color)
        ax1.plot(df.index, df[ylabel1], color=color, label=ylabel1)
        ax1.tick_params(axis='y', labelcolor=color)
        ax1.xaxis.set_major_locator(dates.MonthLocator(interval=2))
        ax1.xaxis.set_major_formatter(dates.DateFormatter('%b-%Y'))

        ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis
        color = 'tab:blue'
        ax2.set_ylabel(ylabel2, color=color)  # we already handled the x-label with ax1
        ax2.plot(df.index, df[ylabel2], color='tab:red')
        ax2.set_ylim(ylim2)
        ax2.tick_params(axis='y', labelcolor=color)

        plt.title(title)
        fig.tight_layout()  # otherwise the right y-label is slightly clipped
        #save as 2 different files
        plt.savefig(f'Output/plot/{out_path}.png')
        plt.show()