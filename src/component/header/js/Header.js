import React, {Component, useEffect, useState} from "react";
import PropTypes from "prop-types";
import "../scss/Header.scss";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import cn from 'classnames';
import Profile from "./Profile";
import MenuModal from "./MenuModal";
import {Link} from "react-router-dom";

const Header =()=> {
  const [menu, setMenu]=useState(false);
  const [isInput,setIsInput]=useState(true);
  const [isProfile,setProfile]=useState(false);
  const [isLogin,setLogin]=useState(true);
  const findPage=()=>{
    if (window.location.href.includes("main")) {
      setIsInput(false);
    }
  }
  useEffect(() => {
    findPage();
  }, []);


  function menuHandler() {
    setMenu(!menu);
  }
  return (
      <div>
        <header id="header">
          <nav id="nav-box">
            <div className="logo__box">
              <a className="logo" href="#">
                <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지" />
              </a>
            </div>
            <ul className="content__box">
              <li className="content__menu">
                <Link className='a' to="/">홈</Link>
              </li>
              <li className="content__menu">
                <Link className='a' to="/rank">랭킹</Link>
              </li>
              <li className="content__menu">
                <Link className='a' to="/board/main">게시판</Link>
              </li>
              <li className="content__menu">
                <Link className='a' to="#">..</Link>
              </li>
              {isInput===true&&<SearchBox/>}

            </ul>
            <ul className="certification__box">
              {isLogin===true&&<LoginBtn/>}
              {isProfile===true&&<Profile/>}

            </ul>
              <div className="nav_toggle_Btn" onClick={menuHandler}>
                <TiThMenu/>
              </div>
          </nav>
        </header>
        <MenuModal menu={menu} isProfile={isProfile} isLogin={isLogin}/>
      </div>
  );
}


Header.propTypes = {};

export default Header;
