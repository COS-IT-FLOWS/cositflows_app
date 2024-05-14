
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential # type: ignore
from keras.layers import LSTM, Dense, Bidirectional # type: ignore

data_with_date = pd.read_csv('Input/data_rf_gwl_api_5d_api_90d.csv', index_col='date', usecols=['date', 'rainfall','gwl','api_5days', 'api_90days'])
data1 = data_with_date[['rainfall', 'gwl']]
data2 = data_with_date[['api_5days','gwl']]
data3 = data_with_date[['api_90days', 'gwl']]

# Normalize the data
scaler = StandardScaler()
data_scaled_1 = scaler.fit_transform(data1)
data_scaled_2 = scaler.fit_transform(data2)
data_scaled_3 = scaler.fit_transform(data3)
print(data_scaled_1.shape)
print(data_scaled_2.shape)
print(data_scaled_1)

# Select the 1st and 2nd columns of data_scaled1
data_scaled_1_selected = data_scaled_1[:, :2]
# Select the 1st and 2nd columns of data_scaled_2
data_scaled_2_selected = data_scaled_2[:, 0].reshape(-1, 1)
# Select the 1st and 2nd columns of data_scaled_3
data_scaled_3_selected = data_scaled_3[:, 0].reshape(-1, 1)

# Combine the selected columns
data_scaled_combined = np.hstack((data_scaled_1_selected, data_scaled_2_selected, data_scaled_3_selected))
data_scaled_combined.shape

# Split the data into training and testing sets
train_size = int(len(data_scaled_combined) * 0.9)
test_size = len(data_scaled_combined) - train_size
train_data, test_data = data_scaled_combined[0:train_size, :], data_scaled_combined[train_size:len(data_scaled_combined), :]
print(train_data.shape)
print(test_data.shape)
print(train_size)
print(test_data)

# Reshape the data for LSTM input for train data
# Select all columns except the second column
selected_column = train_data[:, np.arange(train_data.shape[1]) != 1]

# Reshape the selected data into a 3D array
train_X = np.reshape(selected_column, (train_data.shape[0], train_data.shape[1] - 1, 1))
train_Y = train_data[:, 1]

# Reshape the data for LSTM input for test data
# Select all columns except the second column
selected_columns = test_data[:, np.arange(test_data.shape[1]) != 1]

# Reshape the selected data into a 3D array
test_X = np.reshape(selected_columns, (test_data.shape[0], test_data.shape[1] - 1, 1))
test_Y = test_data[:, 1]
print(train_X.shape)
print(test_X.shape)
print(train_Y.shape)
print(test_Y.shape)

# Define the LSTM model with bidirectional layers
model = Sequential()
# Define the input shape according to the shape of each sample in train_X
input_shape = (train_X.shape[1], train_X.shape[2])

# Add Bidirectional LSTM layer with 32 units
model.add(Bidirectional(LSTM(32, return_sequences=True), input_shape=input_shape))
model.add(Bidirectional(LSTM(32, return_sequences=False)))
model.add(Dense(1))
model.compile(loss='mean_squared_error', optimizer='adam')

# Train the model
model.fit(train_X, train_Y, epochs=10, batch_size=1, verbose=2)

#model = load_model('lstm_rf_api_2y.h5')
test_predict = model.predict(test_X)

#print(test_predict.shape)
#print(test_Y.shape)

out_Y = [val[0] for val in test_predict]
out_Y = np.array(out_Y)


print(out_Y.shape)
print(test_Y.shape)
print(test_X.shape)

# Split test_X along the second dimension
test_x1 = test_X[:, 0, :]  # This selects the first element along the second dimension
test_x2 = test_X[:, 1, :]
test_x3 = test_X[:, 2, :]
print(test_x3.shape)

# Reshape test_y
test_Y= np.reshape(test_Y,(test_x1.shape[0], 1))
print(test_Y.shape)

# Combine the text_x and text_y 
observed= np.hstack((test_x1, test_Y))
# observed2= np.hstack((test_x2, test_Y))
# observed3= np.hstack((test_x3, test_Y))

#reshape out_y
out_Y= np.reshape(out_Y, (test_x2.shape[0], 1))

#combine the test_x1 and out_y
predict= np.hstack((test_x1, out_Y))

print(predict.shape)
print(observed.shape)

#plt.plot(scaler.inverse_transform(predict, observed))
predict_unscaled1 = scaler.inverse_transform(predict)
observed_unscaled1 = scaler.inverse_transform(observed)
print (observed_unscaled1)
print(predict_unscaled1)

#plt.plot(scaler.inverse_transform(predict, observed))
predict_unscaled1 = scaler.inverse_transform(predict)

observed_unscaled1 = scaler.inverse_transform(observed)
print (observed_unscaled1)
print(predict_unscaled1)

df = pd.DataFrame()
df['rainfall'] = data_with_date['rainfall'][train_size:len(data_with_date)]
df['api_5days'] = data_with_date['api_5days'][train_size:len(data_with_date)]
df['api_90days'] = data_with_date['api_90days'][train_size:len(data_with_date)]
df['gwl_obs'] = observed_unscaled1[:, 1]
df['gwl_prd'] = predict_unscaled1[:, 1]
print(df)
df.to_csv('Outputs/csv/bidirectional_lstm_rf.csv', index=True)

#### single plots/

import matplotlib.dates as dates
fig = plt.figure()
ax = fig.add_subplot()
color = 'tab:blue'
ax.set_xlabel('months')
ax.plot(df.index, df['gwl_obs'], label='gwl_obs', linestyle='dashed')
ax.plot(df.index, df['gwl_prd'], label='gwl_prd', linestyle='dashed')
ax.set_ylabel('gwl (m)')
ax.set_ylim(12,4)
ax.xaxis.set_major_locator(dates.MonthLocator(interval=3))
ax.xaxis.set_major_formatter(dates.DateFormatter('%b'))
ax.set_xlabel('date')
ax.legend()

plt.suptitle('rainfall, API_5d, API_90d & Groundwater Level')

# Show the plots
plt.show()