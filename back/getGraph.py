import sys 
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas_datareader import data as pdr
from datetime import datetime
from PIL import Image # 이미지 저장
# Flask 사용
import json
from flask import Flask, request, jsonify
from flask_restx import Resource, Api, reqparse

# 한글 폰트
from matplotlib import font_manager, rc
font_path = "C:/Windows/Fonts/gulim.ttc"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)

# 오늘 날짜와 10년전 날짜 구하기 구하기
now = datetime.now()
past = datetime(now.year - 10, now.month, now.day)
end = datetime(now.year, now.month, now.day); 

# Flask 작업
app = Flask(__name__)
api = Api(app)
app.config['DEBUG'] = True

@app.route('/dd')
def index():
    return 'flask 테스트123'

@app.route('/test')
class testAPI(Resource):
    def get(self):
        return jsonify({"result": "connect 성공 from flask"})
    
    def getPlot(ticker,name): 
        data = pdr.DataReader(ticker+'.KS', 'yahoo', start = past, end = end); 
        plt.figure(figsize=(7,4))

        plt.title(name + ' 최근 10년간 주가변화')
        plt.ylabel('price (KRW)')
        plt.xlabel('period (day)')
        plt.grid()

        plt.plot(data['Close'], label='Close', color='b')
        plt.legend(loc='best')

        plt.savefig('../front/build/graph/' + ticker + '.png')



if __name__ == '__main__': 
    getPlot(sys.argv[1], sys.argv[2])

