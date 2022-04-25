import { Navbar } from "./Navbar"
import { useState, useEffect } from "react";
import "../App.css"
import { SearchBar } from "./SearchBar"
import axios from 'axios';
import { useLocation } from "react-router-dom";
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadioForm from "./RadioForm";

export function Stock() {
  const searchInfo = SearchBar()
  const location = useLocation();
  const [mode, setMode] = useState(null);
  const [data, setData] = useState([]);

  const getParam = () => {
    const param = location.state.ticker
    axios
      .post("/stock", {param})
      .then(returnData => {
        // console.log(returnData.data.data.json.close[0])
        // console.log(returnData.data.data.json.date[0])
        // console.log(returnData.data.data.json.date.length)
        console.log(returnData.data.data.json.data)
        console.log(Object.values(returnData.data.data.json.data).length)
        console.log(Object.values(returnData.data.data.json.data))

        if(returnData != null){
          
          const getData = Object.values(returnData.data.data.json.data)
          // console.log(data[0].name)
          // console.log(data[0].uv)
          // console.log(data[1].uv)
          // console.log(data[0].uv + data[1].uv)

          
          const len = Object.values(returnData.data.data.json.data).length
          var newData = [...data]
          if(newData[0]){
            newData=[]
          }
          for(let i=0; i<len; i++){
            const p = {name:getData[i].name, close:getData[i].uv}
            newData.push(p)
            p ={}
          }
          setData(newData)
          console.log(newData)
          console.log(data)

          const content = (
            <AreaChart
              width={800}
              height={500}
              data={newData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="close" stroke="#000" fill="#fff"/>
    </AreaChart>
          )
          setMode(content)
          
        }
        
          
      })
      
  }
  useEffect(()=>{
    getParam()
  },[location.state.ticker]);


  return (
    <>
    <div className="Nav">
        <Navbar/>
    </div>
    <div className="firstGraph">
        {location.state.ticker}
        {location.state.name}
        <div className="loader" />
        <p>지난 10년의 종가</p>
        {mode}    
    </div>
    <div className="checkBox">
      <h3>딥러닝 모델을 선택해주세요</h3>
      <RadioForm />                
    </div>
    
  </>
  )
}