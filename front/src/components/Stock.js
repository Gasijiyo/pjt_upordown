import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "../App.css"
import { SearchBar } from "./SearchBar"
import axios from 'axios';
import { useLocation } from "react-router-dom";
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadioForm from "./RadioForm";
import Footer from "./Footer";

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
              width={1200}
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

    <div class="stocks_contents">
      <section class="w-[1200px] mb-[80px] m-auto">
        <div className="firstGraph">
          <div class="bg-gradient-to-tr from-orange-500 to-orange-700 mt-4 mb-4 -ml-[65px] mr-auto rounded-xl text-white grid items-center w-full h-24 py-4 px-8 z-51">
            <h6 class="text-gray-200 text-xs font-medium">{location.state.ticker}</h6>
            <h2 class="text-white text-2xl">{location.state.name}</h2>
          </div>
          <div className="loaderBox">
            {mode}
            {!mode && <div className="loader" />}
          </div>
        </div>
      </section>
      
      <section class="w-[1200px] mb-[80px] m-auto">
        <div className="border-t"/>
        <div class="bg-gradient-to-tr from-green-400 to-green-600 mt-4 mb-4 -ml-[65px] mr-auto rounded-xl text-white grid w-full text-center h-16 py-4 px-8">
          <h3 class="text-white text-2xl">Select deep learning model</h3>
        </div>
        <RadioForm />
      </section>   
    </div>
    <div className="stocks_footer">
      <Footer/>
    </div>
    </>
  )
}