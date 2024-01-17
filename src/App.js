import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/header/js/Header";
import {Reset} from "styled-reset";
import Template from "./component/member/template/js/Template";
import {BrowserRouter, Route, Routes} from "react-router-dom";

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
          <Route path="/" element={<Template />} />

        </Routes>
      </BrowserRouter>

  );
}

export default App;
