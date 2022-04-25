from flask import Flask, request, jsonify
import pandas as pd
import json
import numpy as np
import sys 
from pandas_datareader import data as pdr
from datetime import datetime
from keras.layers import LSTM, Dropout, Dense, Activation
from sklearn.preprocessing import MinMaxScaler
import keras


app = Flask(__name__)

@app.route('/test', methods=['POST'])
def test():
    ticker = request.args['file']
    print(ticker)
    now = datetime.now()
    past = datetime(now.year - 10, now.month, now.day)
    end = datetime(now.year, now.month, now.day); 
    data = pdr.DataReader(ticker+'.KS', 'yahoo', start = past, end = end)

    # list = []
    # d = []
    dat = []
    dic = {}
    for index in range(len(data)):
        
        # list.append(data['Close'][index])
        # d.append(str(data.index[index]).split(' ')[0])

        dic['name'] = str(data.index[index]).split(' ')[0]
        dic['uv'] = data['Close'][index]
        dat.append(dic)
        dic={}

    return jsonify({
        # 'date' :d,
        # 'close':list
        'data':dat
    })


@app.route('/pred', methods=['POST'])
def test2():
    ticker = request.args['ticker']
    time= request.args['day']
    params = request.args['feature']
    print(ticker, time, params)
    now = datetime.now()
    past = datetime(now.year - 10, now.month, now.day)
    end = datetime(now.year, now.month, now.day); 
    df = pdr.DataReader(ticker+'.KS', 'yahoo', start = past, end = end)

    # 전처리
    df['Volume'] = df['Volume'].replace(0,np.nan)
    df = df.dropna()
    scaler = MinMaxScaler()
    scale_cols = ['Open','High', 'Low', 'Close', 'Adj Close', 'Volume']

    scaled_df = scaler.fit_transform(df[scale_cols])

    scaled_df = pd.DataFrame(scaled_df, columns=scale_cols)
    
    feature_list = {0: 'Close', 1: 'Volume'}
    if (params == 'C'):
        feature_cols= [feature_list[0]]
    elif (params == 'CV'):
        feature_cols= [feature_list[0], feature_list[1]]   
    
    label_cols=[feature_list[0]]    
    label_df = pd.DataFrame(scaled_df, columns=label_cols)
    feature_df = pd.DataFrame(scaled_df, columns=feature_cols)

    label_np = label_df.to_numpy()
    feature_np = feature_df.to_numpy()

    def make_sequence_dataset(feature, label, window_size, time):

        feature_list=[] # 생성될 feature list
        label_list=[]   # 생성될 label list

        if (time == 'day'):
            for i in range(len(feature) - window_size):
                feature_list.append(feature[i:i+window_size])
                label_list.append(label[i+window_size])      
        elif (time == 'week'):
            num = len(feature) % 5 

            for i in range(num, len(feature)-(window_size + 4), 5):
                feature_list.append(feature[i:i+window_size])
                label_list.append(label[i+window_size:i+window_size+5])  

        return np.array(feature_list), np.array(label_list)
    
    window_size = 0

    if (time == 'day'):
        window_size = 50   # 50일동안의 데이터를 학습하고 51일째 주가를 예측.
        
    elif (time == 'week'):
        window_size = 100   # 100일동안의 데이터로 다음주 동안의 주가를 예측    
        
        
    X, y = make_sequence_dataset(feature_np, label_np, window_size, time)
    split = -int(X.shape[0] * 0.1)   # 90%를 훈련으로 사용

    X_test = X[split:]
    y_test = y[split:]
    dr = f'models/{ticker}_{time}_{params}.h5'
    print(dr)
    model = keras.models.load_model(dr)

    day = df.index[split:]
    
    model_pred = model.predict(X_test)
    get_real = y_test.flatten()
    get_pred = model_pred.flatten()
    print(len(day),len(get_real),len(get_pred))
    
   
    X_for_predict = scaled_df[feature_cols].values[-window_size:].reshape(1, window_size, len(feature_cols))
    result = model.predict(X_for_predict)
    # print(dat)
    # data = [{'name':'alpha', 'pred':'0.8','real':'0.9'}]
    # print(result[0,4])
    
    getFuture = ''
    if time == 'day':
        if(result[0,0] > get_real[-1]):
            getResult = 'UP'
        else:
            getResult = 'Down'
    elif time == 'week':
        if(result[0,4] > get_real[-1]):
            getResult = 'UP'
        else:
            getResult = 'Down'
    # min-max 풀어주기
    scale_back = scaler.inverse_transform(scaled_df) # 원래 값으로
    scale_back_df = pd.DataFrame(scale_back)
    close_min = min(scale_back_df[0])
    close_max = max(scale_back_df[0])
    def back_values(list):
        new_list = list * (close_max - close_min) + close_min
        return new_list
    re_pred = back_values(get_pred)
    print(df['Close'].iloc[split:].values)
    re_real = df['Close'].iloc[split:].values
    print(re_pred)

    dat = []
    dic = {}
    for i in range(len(day)):
        dic['name'] = str(day[i]).split(' ')[0]
        dic['real'] = str(re_real[i])
        dic['pred'] = str(re_pred[i])
        dat.append(dic)
        dic={}

    return jsonify({
        'real': dat,
        'pred': getResult

    })

if __name__ == '__main__':
    app.run(debug=True)