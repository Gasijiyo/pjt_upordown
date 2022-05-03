# UP or Down  주가예측모델 웹 서비스 

### Browsers support
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://gotbahn.github.io/browsers-support-badges/)</br>Chrome |
| --------- |
| Lastest :heavy_check_mark: | 
<!--
:heavy_check_mark:
&check;
-->
## 목차
[1. 개요](#개요)
  * [주제](#주제)  
  * [사용설명](#사용설명)
  * [팀](#팀)


[2. 모델](#모델)
  * [개발환경](#개발환경)
  * [예측모델](#예측모델)
  * [문제점](#문제점)


[3. 백엔드](#백엔드)
  * [개발환경](#개발환경)
  * [문제점](#문제점)


[4. 프론트엔드](#프론트엔드)
  * [개발환경](#개발환경)
  * [문제점](#문제점)

- - -

### 개요

#### 주제

###### 주가 예측 (주가의 상승 또는 하락 예측)

선정 이유 
###### 1. 학습한 웹 개발과 머신 러닝을 모두 활용
###### 2. 사람들이 흥미를 느낌
###### 3. 일상에서 활용 가능

구현
###### 1. 사용자가 선택한 종목을 예측 모델로 전송
###### 2. 모델에서 예측값 생성 후 클라이언트로 전송 
###### 3. 모델 결과값 수신 및 출력


#### 사용설명

* 메인페이지에서 검색 (모델의 정확한 예측을 위해 시총 상위 10개 종목만 검색 가능)

* 출력된 페이지에서 하루 또는 일주일 후의 예측 모델 선택

* 정보 확인

#### 팀

##### 서혜원(팀장), 강민서, 강병주, 김민규, 박양수

총 5명

[목차로 이동](#목차)

- - -

### 모델

#### 개발환경
![](https://img.shields.io/badge/Windows10-0078D6?style=flat-square&logo=Windows&logoColor=white)
![](https://img.shields.io/badge/macOS-000000?style=flat-square&logo=macOS&logoColor=white)
![](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white)
![](https://img.shields.io/badge/Google_Colab-F9AB00?style=flat-square&logo=GoogleColab&logoColor=black)

![](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=black)
![](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=TensorFlow&logoColor=black)
![](https://img.shields.io/badge/Keras-D00000?style=flat-square&logo=Keras&logoColor=white)
![](https://img.shields.io/badge/scikit-learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)

#### 예측모델

학습 데이터 소개 (Train/dev set)
* Kospi top 10 주식가격 (from yahoo finance)
* Feature : Close, Volume (of 7 columns)
* Label : Close
* 데이터량 : 2,213 (전체의 90%)

분석 방법
* 50일 학습 -> 51번째 날 주가 예측 (내일 예측)
* 100일 학습 -> 105번째 날 주가 예측 (일주일 후 예측)

nLayer LSTM 

![image](https://user-images.githubusercontent.com/91354523/166476996-0073b871-b93e-45ac-9716-d862f12cf6f2.png)

Activation 조정 
* tanh -> 'relu' 추가

Optimizer 조정
* adam ->'SGD', ‘rmsprop’ 추가  >>  학습속도 및 MSE 개선



#### 문제점

[목차로 이동](#목차)

- - -

### 백엔드

#### 개발환경
![](https://img.shields.io/badge/Windows10-0078D6?style=flat-square&logo=Windows&logoColor=white)
![](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white)

![](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=black)
![](https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white)
![](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=Nodemon&logoColor=black)
![](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=Flaskn&logoColor=white)


#### 문제점

[목차로 이동](#목차)

- - -

### 프론트엔드

#### 개발환경
![](https://img.shields.io/badge/Windows10-0078D6?style=flat-square&logo=Windows&logoColor=white)
![](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white)

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=black)

#### 문제점

[목차로 이동](#목차)

- - -
