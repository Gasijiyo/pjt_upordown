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
        
        
        if(future == 'UP'){
            if(value1 == 'day'){
                setUd(<div>{location.state.name} 주식은 내일 <span className='upword'>올라갈 것</span>으로 예상</div>)
            }else{
                setUd(<div>{location.state.name} 주식은 일주일 뒤 <span className='upword'>올라갈 것</span>으로 예상</div>)
            }
        }else{
            if(value1 == 'day'){
                setUd(<div>{location.state.name} 주식은 내일 <span className='downword'>내려갈 것</span>으로 예상</div>)
            }else{
                setUd(<div>{location.state.name} 주식은 일주일 뒤 <span className='downword'>내려갈 것</span>으로 예상</div>)
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
              width={1200}
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
          <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">일 선택</FormLabel>
                <RadioGroup row aria-label="day" name="day" value={value1} onChange={handleRadioChange1}>
                  <FormControlLabel
                    value="day"
                    control={<Radio color="primary" />}
                    label="1일"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="week"
                    control={<Radio color="primary" />}
                    label="5일"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
          </div>
          <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">모델 선택</FormLabel>
                <RadioGroup row aria-label="model" name="model" value={value2} onChange={handleRadioChange2}>
                  <FormControlLabel
                    value="C"
                    control={<Radio color="primary" />}
                    label="종가"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="CV"
                    control={<Radio color="primary" />}
                    label="종가+Volume"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>              
          </div>      
          <FormHelperText>계산하는데 시간이 조금 소요됩니다.</FormHelperText>
          <Button type="submit" onClick={handleSubmit} variant="outlined" color="primary" className="selectbutton">
              딥러닝 시작
          </Button>
          {mode}
          {ud}
      {/* </form> */}
    </>
      
    
  );
}