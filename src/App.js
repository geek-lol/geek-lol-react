import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchInput from "./component/SearchInput";
import UserInfoPage from "./component/info/UserInfoPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchInput />} />
          <Route path="/find/:searchValue/:tag" element={<UserInfoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
