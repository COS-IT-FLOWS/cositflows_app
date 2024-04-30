
import pandas as pd

df = pd.read_csv('Input/RF_GWL_Data_2Y.csv')

# print(df.loc[df['rainfall'].isna(),:])

# define the function
def calculate_api(index, window):
    if index < window:
        return 0

    else:
        api=0
        for i in range(0, window):
            multiplier = (1-((i-1)/window))
            val = int(df['rainfall'][index-i])
            out = val * multiplier
            api = api + out
            print(multiplier, i)
            if multiplier <= 0:
                print('Invalid Value')
                break
        return api
    

# function
df['api'] = df.apply(lambda row: round(calculate_api(row.name, 90), 2) , axis=1)

df.to_csv('Output/csv/rf_api_90days.csv',index=False)