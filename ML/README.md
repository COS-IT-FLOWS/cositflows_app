Groundwater Level Prediction - ML Model Testing and Validation 
This repository contains code for testing and validating three machine learning models under the recurrent neural network (RNN) architecture: Long Short-Term Memory (LSTM), Bidirectional LSTM, and Attention LSTM. The models are used to predict groundwater levels based on rainfall and other derived variables. The goal is to understand how rainfall and derived variables  affect groundwater levels, which can be valuable for flood prediction and flood inundation mapping using multiple input options.

### Input Data
+ Rainfall data
+ Multiple APIs (5, 10, 60, 90, 120, 240 days)
+ Effective rainfall
+ Groundwater level data (linear, summer slope)
+ Summer decay factor
+ Effective rainfall

### Normalization
+ Standard scalar
+ Log scalar

### Model performance metrics
+ The model performance metrics used in this project include:
+ Training Accuracy: Measures how well the model fits the training data. It is calculated as 1 minus the RMSE on the training set, converted to a percentage.
+ Testing Accuracy: Evaluates the model's performance on unseen data. Similar to training accuracy, it is calculated as 1 minus the RMSE on the testing set, converted to a percentage.
+ Test Score (RMSE): Computes the RMSE on a new test set (features, labels) to quantify the difference between predicted and actual values. Lower RMSE indicates better model performance.

### Parallelisation
+ Models can be run simultaneously to speed up the process. This is  currently achieved using multiprocessing module in python

#### For the theoretical background and methodology, refer to the link
https://www.geeksforgeeks.org/long-short-term-memory-lstm-rnn-in-tensorflow/
https://www.exxactcorp.com/blog/Deep-Learning/5-types-of-lstm-recurrent-neural-networks-and-what-to-do-with-them

### Attribution
This code is referred from
https://github.com/ROHITHKUMARN/CloudComputing/blob/master/Flood-Prediction-Model/flood_detection_lstm_model.ipynb](https://github.com/ROHITHKUMARN/CloudComputing/blob/master/Flood-Prediction-Model/flood_detection_lstm_model.ipynb)

