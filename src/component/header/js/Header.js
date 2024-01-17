import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import "../scss/Header.scss";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import cn from 'classnames';
import Profile from "./Profile";
import MenuModal from "./MenuModal";

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
              </a>
            </div>
            <ul className="content__box">
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
            <ul className="certification__box">
              {/*<LoginBtn/>*/}
              <Profile/>
            </ul>
              <div className="nav_toggle_Btn" onClick={menuHandler}>
                <TiThMenu/>
              </div>
          </nav>
        </header>
        <MenuModal menu={menu} />
      </div>
  );
}


Header.propTypes = {};

export default Header;
