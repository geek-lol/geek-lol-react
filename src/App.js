import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/main/js/main";
import Board from "./component/board/js/Board";
import Rank from "./component/rank/js/Rank";
import BoardTemplate from "./component/board/js/BoardTemplate";
import MyPageProfile from "./component/mypage/js/MyPageProfile";
import MyPageTemplate from "./component/mypage/js/MyPageTemplate";


function App() {
    // const [hi, setHi] = useState('');
    //
    // useEffect(() => {
    //   axios.get('api/test')
    //       .then(res => {
    //         setHi(res.data);
    //       })
    // }, []);
    return (
        <>
            <Reset/>
            <Header/>
            <Routes>
                <Route path="/template/*" element={<Template/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/rank" element={<Rank/>}/>
                <Route path="/board/*" element={<BoardTemplate />} />
                <Route path="/mypage/*" element={<MyPageTemplate />} />
            </Routes>
        </>
    );
}

export default App;
