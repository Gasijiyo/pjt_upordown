from flask import Flask, request, jsonify
import pandas as pd
import json
import numpy as np
import sys 
from pandas_datareader import data as pdr
from datetime import datetime

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

if __name__ == '__main__':
    app.run(debug=True)