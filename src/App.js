import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import { Reset } from "styled-reset";
import Template from "./component/member/template/js/Template";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./component/main/js/main";
import Board from "./component/board/js/Board";
import Rank from "./component/rank/js/Rank";
import BoardTemplate from "./component/board/js/BoardTemplate";
import MyPageProfile from "./component/mypage/js/MyPageProfile";
import MyPageTemplate from "./component/mypage/js/MyProfileTemplate";
import ResponseTime from "./component/game/ResponseTime";
import SpectorMain from "./component/spector/js/SpectorMain";
import BoardShorts from "./component/board/shorts/js/BoardShorts";
import "./component/LinkReset.scss"
import MyProfileTemplate from "./component/mypage/js/MyProfileTemplate";
import MyInfoTemplate from "./component/mypage/js/MyInfoTemplate";
function App() {
    const [showHeader, setShowHeader] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (window.location.pathname === "/board/shorts") {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [location.pathname]);

    return (
        <>
            <Reset />
            {showHeader && <Header />}
            <Routes>
                <Route path="/template/*" element={<Template />} />
                <Route path="/" element={<Main />} />
                <Route path="/rank" element={<Rank />} />
                <Route path="/spector" element={<SpectorMain />} />
                <Route path="/board/*" element={<BoardTemplate />} />
                <Route path="/mypage/" element={<MyProfileTemplate />} />
                <Route path="/mypage/info" element={<MyInfoTemplate />} />
                <Route path="/resgame" element={<ResponseTime /> }/>
            </Routes>
        </>
    );
}

export default App;
