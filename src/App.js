import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";
<<<<<<< HEAD
import Main from "./component/main/js/main";
import Board from "./component/board/js/Board";
=======
import Rank from "./component/rank/js/Rank";
import Main from "./component/main/js/main";
>>>>>>> merge1

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
<<<<<<< HEAD
            <Route path="/main" element={<Main />} />
            <Route path="/Template" element={<Template />} />
            <Route path="/board" element={<Board />}/>
        </Routes>
      </BrowserRouter>
=======
          <Route path="/template/*" element={<Template />} />
          <Route path="/" element={<Main />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </>
>>>>>>> merge1
  );
}

export default App;
