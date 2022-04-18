import { Navbar } from "./Navbar"
import { useState, useEffect } from "react";
import "../App.css"
import { SearchBar } from "./SearchBar"
import axios from 'axios';
import { useLocation } from "react-router-dom";



export function Stock() {
  const location = useLocation();
  const check = 'HI'
  

  return (
    <>
      <div className="Nav">
          <Navbar/>
      </div>
    <div>
          <p>그래프 출력할 칸</p>
          {location.state.ticker}
          {location.state.name}
          
          <p>{check}</p>
          <img src={`/graph/${location.state.ticker}.png`} alt=""></img>
    </div>
    </>
  )
}