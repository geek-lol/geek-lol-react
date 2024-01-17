import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import "../scss/Header.scss";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import cn from 'classnames';

const Header =()=> {
  const [menu, setMenu]=useState(false);
  function menuHandler() {
    setMenu(!menu);
  }
  return (
      <div>
        <header id="header">
          <nav id="nav-box">
            <div className="logo__box">
              <a className="logo" href="#">
                <span className="geek">GEEK</span>
                <span className="lol">LOL</span>
              </a>
            </div>
            <ul className={cn("content__box",{active:menu})}>
              <li className="content__menu">
                <a href="#">홈</a>
              </li>
              <li className="content__menu">
                <a href="#">랭킹</a>
              </li>
              <li className="content__menu">
                <a href="#">게시판</a>
              </li>
              <li className="content__menu">
                <a href="#">챔피언 분석</a>
              </li>
              <SearchBox/>
            </ul>
            <LoginBtn/>
            <div className="nav_toggle_Btn" onClick={menuHandler}>
              <TiThMenu />
            </div>
          </nav>
        </header>
      </div>
    );
}




Header.propTypes = {};

export default Header;
