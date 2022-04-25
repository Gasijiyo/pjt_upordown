import "../App.css"
import React from 'react';
import { Navbar } from "./Navbar";

export function About() {
  return (
    <>
    <div className="Nav">
        <Navbar/>
    </div>
    
    <div className='content'>
      <section className='about inner'>
        <h2>About us</h2>
        <p>
            Hello, guys! We're students studying coding and AI(Artificial Intelligence), and this website is for presenting you guys what we have learned.
            So we made a website to predict stock price by times with machine learning. Hope you guys can find it interesting!
        </p>    
        <div className='disclaimer'> 
          <h4>Disclaimer</h4>
          <p>
          It's just for fun! Don't take it seriously, okay? We don't have any responsibilities if you lose your money by following our prediction!!
          </p>
        </div>
        <p>Okay, are you ready? Let's get started with our model!</p>
      </section>

      <section className='our_model inner'>
        <h2>Our model and why we chose</h2>
        <p>Our model is LSTM(Long Short Term Memory).</p> 
        <div className='lstm'>
          <p className='lstm_def'>
            LSTM is an artificial recurrent neural network (RNN) architecture used in the field of deep learning.
            A common LSTM unit is composed of a <strong>cell</strong>, an <strong>input gate</strong>, an <strong>output gate</strong> and a <strong>forget gate</strong>.
            The cell remembers values over arbitrary time intervals and the three gates regulate the flow of information into and out of the cell.
            LSTM networks are well-suited to classifying, processing and making predictions based on time series data, since there can be lags of unknown duration between important events in a time series. 
          </p>
          <div className='origin'>- from Wikipedia -</div>
        </div>

        <div className='img_diff'>
          <img src="difference.jpg" alt='graph' width="500" height="300" />
          <img src="layer.jpg" alt='graph' width="500" height="300" />
        </div>

        <p>
          Let's stop talking about those definitions. It's harder to understand what it says 100%. 
          The more important thing that we should focus on is why it's been remarkable and we chose among many other models.
          If you're clever, you might catch the reason in the definition. 
          As you can see, it's well-known as a good model for prediction on time series data. And hope you wouldn't forget what we handel now. Stock price!! Which is a truly time series data. So that's why!  
        </p>
       </section>

       <section className='process inner'>
        <h2>Development process</h2>
        <p>It's how we made our model!</p>

        <ul className='devel_proc'> 
          <li>Load data and identify distribution</li> 
          <li>→</li>
          <li>Preprocess data</li>
          <li>→</li>
          <li>Generate data</li>
          <li>→</li>
          <li>Build and train model(LSTM)</li>
        </ul>
        <br />

        <section>
          <h4>Data load</h4>
          <p>
            Actually we used stock price data from Yahoo Finance. The website is very useful and has a lot of data if you want to find stock data by times.
            So here is <a href='https://finance.yahoo.com/'>link</a>. 
          </p>  
            <div>
            <img src="yahoo.jpg" alt='graph' width="500" height="300" /> 
            </div>
            <br/>
            <br/>
            <p>
              For this model, we selected only 10 years data on top 10 companies in Korean stock market.  
              And as feature, we chose 'Close' and 'Volume'. But you can choose another column like 'Open', 'High', 'Low' and etc. You have to keep in mind that there is not a certain right way to choose features. 
              But if you wonder why we chose the two columns, we thought 'Close price' is kinda stable cause it's a fixed price at the end of day and 'Volume' is also a important key to make an effect on stock price.   
            </p>
        </section>   
        <br />

        <section>
          <h4>Data preprocessing</h4>
          <p>
            As we mentioned above, cause 'Volume' is a important factor, the rows whose 'Volume' value is 0 should be thrown away from dataset. 
            Otherwise, the model trained with those outliers could be worse in prediction. That's not what we want. 
            <br />
            And we also normalised all values for better model. So every value changed to the value between 0 and 1.   
          </p>
        </section>
        <br />

        <section>
          <h4>Data generation for training model</h4>
          <p>
            Our model supplies two functions. One is to predirect a stock price in next day and the other is to do in next week.
            So that's how our model works: it's trained like predicting a stock price in 51th day after learning stock prices for 50 days and 
            in same way, predicting 101th, 102th, 103th, 104th, 105th after learning for 100 days.
            Don't forget that the stock market doesn't open in weekends. So only 5 values in week, not 7. 
            <br />
            And we used 90% of data(divided to 51 days datasets or 105 days) for training model and 10% for testing. 
          </p>
        </section>  
        <br />

        <section>
          <h4>Model build and train</h4>
          <p>
            When it comes to building model, which means to select best model structure and parameters, it's really hard. Really hard! I'm no kidding!
            At least thanks to many research papers, finding a best model structure was less hard. As you already know, LSTM is the best(?) model for prediction on time series data.
            But the problem is that there are so many ways to set parameters in model. And do you remember what I said, no right way to find best features? Same here. No right way to find best parameters either. 
            Perhaps in this point, it would be better to mention this: it's impossible to make a model whose prediction is precise. In fact, the definition of best model in machine learning is not a prefectly correct model 
            but a model whose prediction is the closest to real values. So every time people are trying to find better model structures and parameters in various way, and that's why there is no exactly right way in machine learning and our model would not be possibly best for sure. 
            We're just students studying this area and this website is a result from our project with machine learning. So please understand us if you find any mistakes on it. 
            <br />
            <br />
            Anyway let's go back to what we're talking about. We selected LSTM as a model structure and for finding best parameters, we used a way called auto parameter tuning. 
            So we made our model in this way and trained it with train data and also tested with test data. 
          </p>
        </section>
       </section>
    </div>
    </>
  );
}