import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/main/js/main";
import Board from "./component/board/js/Board";
import InfoTemplate from "./component/summonerInfo/js/InfoTemplate";

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
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/find/:searchValue/:tag" element={<InfoTemplate />} />
            <Route path="/find/:riotIdGameName/:riotIdTagline" element={<InfoTemplate />} />
            <Route path="/Template" element={<Template />} />
            <Route path="/board" element={<Board />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
