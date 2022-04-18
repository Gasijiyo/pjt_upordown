import axios from 'axios';
import React from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { NavLink } from 'react-router-dom';
import "../App.css"
import { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
var data = require("../Top10.json");


export function SearchBar()  {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  // const [ticker, setTicker] = useState(0)
  const [info, setInfo] = useState(null);
  
  const onChange = (e) => {
    setName(e.target.value);
    // setTicker(e.target.value);
  }
  
  const onSearch = (props) => {
    console.log(props);
    axios.post("/stock", {props}).then(response => {      
      setInfo(response.data)
      console.log('post 리턴 성공', response.data)
      info = response.data.ticker;
      console.log(info)      
    }).catch(function (error){
      console.log(error);
    })    
    .catch(() => {
      console.log("불러오기 실패")
    })
  }
  

  return (
    <>        
      <div className="Search-container">          
          <input type="text" value={name} onChange={onChange} placeholder="시총 상위 10개 종목만 검색 가능합니다."/>

          <button onClick={() => onSearch(name)}> 검색 </button>
          
        
          <div className="Dropdown">
            {data.filter(item => {
              const searchedName = name.toLowerCase();
              const companyName = item.name.toLowerCase();
              const ticker = item.ticker;              

              return searchedName && companyName.includes(searchedName) 
                    && companyName !== searchedName && ticker;
            }) 
            .map((item)=> (
              <div onClick={() => onSearch([item.ticker, item.name])} 
              className="Dropdown-row" key={item.ticker}>
                  <ul className="SearchList">
                    
                    
                      <li>
                        <span 
                        onClick={()=>{
                          navigate('/stock/'+item.ticker,{
                            state:{ticker:item.ticker,
                            name:item.name
                          }
                          });
                        }}
                        >{item.ticker}  {item.name}</span>                      
                      </li>
                    
                  </ul>                 
              </div>
              ))}
          </div>
      </div>
    </>
  );
}








// // 키워드, 결과값, 업데이트필드 전달받음.
// const SearchBar = ({keyword, results, updateField}) => {

//     const updateText = text => {
//       updateField("keyword", text, false);
//       updateField("results", []);
//     }

//     var renderResults;
//     const arr = results['results'];
//     // arr에 검색에 대한 결과가생기면 SearchView 호출
//     if(arr){
//       renderResults = arr.map((item => {
//         return (
//           <SearchView 
//             updateText = {updateText}
//             name = {item.name}
//             num = {item.num}          
//           />
//         );
//       }));
//     }

//     // onChange로 글자 입력때마다 updateField 및 renderResults 호출. 
//     return (
//       <div className='auto'>
//         <input className='search-bar'
//           placeholder='종목명 또는 종목코드를 입력해주세요'
//           value={keyword || ""}
//           onChange={e => updateField("keyword", e.target.value)}
//         />
//         <div className='search-results'>{renderResults}</div>
//       </div>
//     )

//   } // end of SearchBar

// // 검색된 item의 name, code 출력
// // 결과값 클릭 시 updateText 호출해 input에 name표시
// const SearchView = ({name, code, index, updateText}) => {
//     return (
//       <div className={`search-preview ${index === 0 ? "start":"end"}`} 
//             onClick={() => updateText(name)}>
//           <div className='first'>
//               <p className='code'>{code}</p>
//               <p className='name'>{name}</p>              
//           </div>
//       </div>
//     )

// } // end of SearchView

//export default SearchBar;
