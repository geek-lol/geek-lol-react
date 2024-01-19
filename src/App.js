import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Rank from "./component/rank/js/Rank";
import Main from "./component/main/js/main";

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
          <Reset />
          <Header />
        <Routes>
          <Route path="/template/*" element={<Template />} />
          <Route path="/" element={<Main />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </>
  );
}

export default App;
