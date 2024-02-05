import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import { Reset } from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, json, Route, Routes, useLocation} from "react-router-dom";
import Main from "./component/main/js/main";
import Board from "./component/board/js/Board";
import Rank from "./component/rank/js/Rank";
import BoardTemplate from "./component/board/js/BoardTemplate";
import ResponseTime from "./component/game/js/ResponseTime";
import SpectorMain from "./component/spector/js/SpectorMain";
import BoardShorts from "./component/board/shorts/js/BoardShorts";
import "./component/LinkReset.scss"
import MyProfileTemplate from "./component/mypage/js/profile/MyProfileTemplate";
import MyInfoTemplate from "./component/mypage/js/info/MyInfoTemplate";
import MyActivityTemplate from "./component/mypage/js/activity/MyActivityTemplate";
import CSGame from "./component/game/js/CSGame";
import MainScene from "./component/game/js/FcsGame";
import InfoTemplate from "./component/summonerInfo/js/InfoTemplate";
import {getCurrentLoginUser} from "./utils/login-util";

function App() {
    const [showHeader, setShowHeader] = useState(true);
    const location = useLocation();
    const [touch, setTouch] = useState("");
    const [autoLogin, setAutoLogin] = useState(null);



    // useEffect(() => {
    //     console.count(getCurrentLoginUser().autologin);
    //     setAutoLogin(getCurrentLoginUser().autologin);
    // }, []);
    useEffect(() => {

        if(getCurrentLoginUser().autologin === "true"){
            console.log("true 뜸");
        }else if(getCurrentLoginUser().autologin === "false"){
            console.log("false아닌 무언가");
            window.addEventListener('beforeunload', e => {
                console.log(autoLogin);
                localStorage.clear();
                }
            )
        }
        setAutoLogin(getCurrentLoginUser().autologin);

    }, []);








    useEffect(() => {
        if (window.location.pathname === "/board/shorts") {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [location.pathname]);
    const sendTouch=(e)=>{
        console.log(e.target);
        const classToClickMap = {
            "c1": "c1",
            "c2": "c2",
            "c3": "c3",
        };
        for (const className in classToClickMap) {
            if (e.target.className.includes(className)) {
                setTouch(classToClickMap[className]);
                break;
            }
        }
    }

    return (
        <>
            <Reset />
            {showHeader && <Header sendTouch={sendTouch} />}
            <Routes>
                <Route path="/template/*" element={<Template />} />
                <Route path="/" element={<Main />} />
                <Route path="/rank" element={<Rank />} />
                <Route path="/find/:searchValue/:tag" element={<InfoTemplate />} />
                <Route path="/find/:riotIdGameName/:riotIdTagline" element={<InfoTemplate />} />
                <Route path="/spector" element={<SpectorMain />} />
                <Route path="/board/*" element={<BoardTemplate />} />
                <Route path="/mypage/*" element={<MyProfileTemplate />} />
                <Route path="/mypage/info" element={<MyInfoTemplate />} />
                <Route path="/mypage/active" element={<MyActivityTemplate />}/>
                <Route path="/resgame" element={<ResponseTime /> }/>
                <Route path="/csgame" element={<MainScene />}/>
            </Routes>
        </>
    );
}

export default App;
