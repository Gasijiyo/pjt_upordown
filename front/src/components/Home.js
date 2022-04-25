// import { useNavigate } from "react-router-dom"
// import { useState } from "react"
import "../App.css"
import { SearchBar } from "./SearchBar";
import React from 'react'; 

export function Home() {

    return (
        <>              
            <div className="MainLogo">
                <img src="1.png" alt="logo" className="Logo"/>
            </div>            
            
            <div className="Search">
                <SearchBar/>
            </div>
        </>
    )
}



    // // 시총 상위10개 기업 (결과값)
    // const top10 = [
    //     {id:0, num:'005930', name:'삼성전자'},
    //     {id:1, num:'000660', name:'SK하이닉스'},
    //     {id:2, num:'035420', name:'NAVER'},
    //     {id:3, num:'051910', name:'LG화학'},
    //     {id:4, num:'207940', name:'삼성바이오로직스'},
    //     {id:5, num:'035720', name:'카카오'},
    //     {id:6, num:'006400', name:'삼성SDI'},
    //     {id:7, num:'005380', name:'현대자동차'},
    //     {id:8, num:'000270', name:'기아자동차'},
    //     {id:9, num:'005490', name:'POSCO Holdings'}
    // ];
    // const [keyword, setKeyword] = useState();
    // const [results, setResult] = useState([]);

    // // 필드 업데이트
    // const updateField = (field, value, update = true) => {
    //     if(update)onSearch(value);
    //     if(field === 'keyword'){
    //         setKeyword(value);
    //     }
    //     if (field === 'results'){
    //         setResult(value);
    //     }
    // }
    // // 입력된 값으로 top10 배열과 매칭결과 저장
    // const onSearch = text => {
    //     var results = top10.filter(item => true === matchName(item.name, text));
    //     setResult({results});
    // }
    
    // // 검색할 문자열을 키워드와 비교해 매칭 여부 확인
    // const matchName = (name, keyword) => {
    //     var keyLen = keyword.length;
    //     name = name.toLowerCase().substring(0, keyLen);
    //     if(keyword === "") return false;
        
    //     return name === keyword.toString().toLowerCase();
    // }

