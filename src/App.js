import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpectorMain from "./component/spector/js/SpectorMain";
import SpectorTemplate from "./component/spector/js/SpectorTemplate";
import Rank from "./component/rank/js/Rank";

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
          <Reset />
          <Header />
        <Routes>
          {/*<Route path="/" element={<Template />} />*/}
          <Route path="/" element={<Rank />} />

        </Routes>
      </BrowserRouter>

  );
}

export default App;
