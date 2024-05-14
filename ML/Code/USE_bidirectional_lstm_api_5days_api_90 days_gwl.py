import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Bidirectional
import os



data_with_date = pd.read_csv('Input/data_rf_gwl_api_5d_api_90d.csv', index_col='date', usecols=['date', 'api_5days', 'api_90days', 'gwl'])

data1 = data_with_date[['api_5days', 'gwl']]
data2 = data_with_date[['api_90days','gwl']]


# Normalize the data
scaler = StandardScaler()
data_scaled_1 = scaler.fit_transform(data1)
data_scaled_2 = scaler.fit_transform(data2)

print(data_scaled_1.shape)
print(data_scaled_2.shape)

# Select the 1st and 2nd columns of data_scaled1
data_scaled_1_selected = data_scaled_1[:, :2]

# Select the 1st column of data_scaled_2
data_scaled_2_selected = data_scaled_2[:, 0].reshape(-1, 1)

# Combine the selected columns
data_scaled_combined = np.hstack((data_scaled_1_selected, data_scaled_2_selected))




# Split the data into training and testing sets
train_size = int(len(data_scaled_combined) * 0.9)
test_size = len(data_scaled_combined) - train_size
train_data, test_data = data_scaled_combined[0:train_size, :], data_scaled_combined[train_size:len(data_scaled_combined), :]
print(train_data.shape)
print(test_data.shape)



# Reshape the data for LSTM input
train_X = np.reshape(train_data[:, [0,2]], (train_data.shape[0], train_data.shape[1] - 1, 1))
train_Y = train_data[:, 1]
test_X = np.reshape(test_data[:, [0,2]], (test_data.shape[0], test_data.shape[1] - 1, 1))
#print(data_scaled_combined[:2], train_Y[:2], train_Y.shape)
#train_X.shape[0]
test_Y = test_data[:, 1]
print(train_X.shape)



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
# model.save('model/lstm_rf_api_2y.h5')



#model = load_model('lstm_rf_api_2y.h5')
test_predict = model.predict(test_X)

#print(test_predict.shape)
#print(test_Y.shape)




out_Y = [val[0] for val in test_predict]
out_Y = np.array(out_Y)


out_Y.shape
test_Y.shape
test_X
test_X.shape




# Split test_X along the second dimension
test_x1 = test_X[:, 0, :]  # This selects the first element along the second dimension
test_x2 = test_X[:, 1, :]  # This selects the second element along the second dimension


#reshape test_y
test_Y= np.reshape(test_Y,(test_x1.shape[0], 1))

#combine the text_x and text_y 
observed1= np.hstack((test_x1, test_Y))

#combine the text_x and text_y 
observed2= np.hstack((test_x2, test_Y))

#reshape out_y
out_Y= np.reshape(out_Y,(test_x2.shape[0], 1))

#combine the test_x1 and out_y
predict1= np.hstack((test_x1, out_Y))

#combine the text_x2 and out_y 
predict2= np.hstack((test_x2, out_Y))




#plt.plot(scaler.inverse_transform(predict, observed))
predict_unscaled1 = scaler.inverse_transform(predict1)
predict_unscaled2 = scaler.inverse_transform(predict2)

observed_unscaled1 = scaler.inverse_transform(observed1)
observed_unscaled2 = scaler.inverse_transform(observed2)

df = pd.DataFrame()
df['api_5d'] = data_with_date['api_5days'][train_size:len(data_with_date)]
df['api_9d'] = data_with_date['api_90days'][train_size:len(data_with_date)]
df['gwl_obs'] = observed_unscaled1[:, 1]
df['gwl_prd'] = predict_unscaled1[:, 1]
print(df)
df.to_csv('Outputs/csv/attention_BI_lstm_api.csv', index=True)


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


plt.suptitle('API_5d, API_90d & Groundwater Level')

# Show the plots
plt.show()
