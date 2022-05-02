import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function RadioForm() {
  const classes = useStyles();
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const ticker = location.state.ticker
  console.log(ticker)
  const [mode, setMode] = useState(null);
  const [ud, setUd] = useState(null);
  const Loading = <div className='loaderBox'>
    <div className='loader' style='animation: loader 5s linear; -webkit-animation: loader 5s linear;'></div>
  </div>
  // 선택한 라디오버튼 값들
  const handleRadioChange1 = (e) => {
    setValue1(e.target.value);    
    console.log(e.target.value)
  };

  const handleRadioChange2 = (e) => {
    setValue2(e.target.value);
    console.log(e.target.value)
  };
  // 버튼 클릭 시 선택한 라디오버튼 값들
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value1, value2)
    // navigate('/stock', {state:{day:value1, model:value2}})
    axios
    .post("/stock", {ticker, value1, value2})
    .then(res => {
        // console.log(Object.values(res.data.data.json.real))
        const getData = Object.values(res.data.data.json.real)        
        const future = Object.values(res.data.data.json.pred)[0]
        
        console.log(future)
        
        
        if(future == 'U'){
            if(value1 == 'day'){
                setUd(
                <div class="bg-gradient-to-tr from-red-400 to-red-600 mb-2 -ml-[65px] rounded-xl text-white grid items-center w-full text-center h-24 pb-4 px-8">
                  <h2 className="font-medium text-2xl mb-0">{location.state.name}</h2>
                  <h6>The stock is expected to go <span class="font-bold underline">UP</span> tomorrow.</h6>
                </div>)
            }else{
                setUd(
                  <div class="bg-gradient-to-tr from-red-400 to-red-600 mb-2 -ml-[65px] rounded-xl text-white grid items-center w-full text-center h-24 pb-4 px-8">
                    <h2 className="font-medium text-2xl mb-0">{location.state.name}</h2>
                    <h6>The stock is expected to go <span class="font-bold underline">UP</span> next week.</h6>
                  </div>)
            }
        }else{
            if(value1 == 'day'){
                setUd(
                <div class="bg-gradient-to-tr from-blue-400 to-blue-600 mb-2 -ml-[65px] rounded-xl text-white grid items-center w-full text-center h-24 pb-4 px-8">
                  <h2 className="font-medium text-2xl mb-0">{location.state.name}</h2>
                  <h6>The stock is expected to go <span class="font-bold underline">DOWN</span> tomorrow.</h6>
                </div>)
            }else{
                setUd(
                  <div class="bg-gradient-to-tr from-blue-400 to-blue-600 mb-2 -ml-[65px] rounded-xl text-white grid items-center w-full text-center h-24 pb-4 px-8">
                    <h2 className="font-medium text-2xl mb-0">{location.state.name}</h2>
                    <h6>The stock is expected to go <span class="font-bold underline">DOWN</span> next week.</h6>
                  </div>)
            }
            
        }
        

        const data=[]
        if(data[0]){
            data=[]
          }

        for(let i=0; i<getData.length;i++){
            const p = {'name': getData[i].name, 'pred':Number(getData[i].pred), 'real':Number(getData[i].real)}
            data.push(p)
            p = {}
        }
        console.log(Number(data))

        const content = (<>
            <LineChart
              width={1000}
              height={500}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pred" stroke="#ff0000"/>
      <Line type="monotone" dataKey="real" stroke="#00b00f"/>
    </LineChart>
          </>)
          setMode(content)
    })

  };

  useEffect(()=>{
    setMode(null)
  },[location.state.ticker]);
  useEffect(()=>{
    setUd(null)
  },[location.state.ticker]);



  return (
    <>
      {/* 라디오 버튼 form */}
      {/* <form onSubmit={handleSubmit}> */}
        <div className="DeeplearnLoaderBox">
          {mode}
        </div>
        <div class="-mt-[450px] -ml-[60px] mb-4 rounded-xl items-center w-[160px] h-[360px] py-2 px-1 border">  
          <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Days</FormLabel>
                <RadioGroup aria-label="day" name="day" value={value1} onChange={handleRadioChange1}>
                  <FormControlLabel
                    value="day"
                    control={<Radio color="primary" />}
                    label="1 day"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="week"
                    control={<Radio color="primary" />}
                    label="7 days"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
          </div>
          <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Features</FormLabel>
                <RadioGroup aria-label="model" name="model" value={value2} onChange={handleRadioChange2}>
                  <FormControlLabel
                    value="C"
                    control={<Radio color="primary" />}
                    label="Close"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="CV"
                    control={<Radio color="primary" />}
                    label="Close + Volume"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>              
          </div>      
          <FormHelperText>It takes some times.</FormHelperText>
          <Button type="submit" onClick={handleSubmit} variant="outlined" color="primary" className="selectbutton">
              Starts learning!
          </Button>
        </div>
        <div className="skeleton-ud">
          {ud}
        </div>
      {/* </form> */}
    </>
      
    
  );
}