import React, {Component, useEffect, useState} from "react";
import "../scss/Header.scss";
import { TiThMenu } from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import Profile from "./Profile";
import MenuModal from "./MenuModal";
import {Link} from "react-router-dom";
import {GoChevronDown} from "react-icons/go";
import cn from "classnames";

const Header =()=> {
  //nav 시작
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');
  const [hovers,sethover]=useState(false);
  const tldlqkf=()=>{
    sethover(false);
  }
  const boardClickHandler=()=>{
    sethover(!hovers);
  }
  function handleIndicator(el) {
    items.forEach(item => {
      item.classList.remove('is-active');
      item.removeAttribute('style');
    });
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = el.getAttribute('active-color');

    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  }
  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      handleIndicator(e.target)});
    item.classList.contains('is-active') && handleIndicator(item);
  });
  //nav 끝
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
        <header id="header" >
          <nav id="nav-box">
            <div className="logo__box">
              <Link className="logo" to="/">
                <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지" />
              </Link>
            </div>
            <ul className="content__box">
              <Link to="/" className="nav-item is-active" active-color="orange">홈</Link>
              <Link to="/rank" className="nav-item" active-color="green">랭킹</Link>
              <div  className="board-btn nav-item" active-color="blue" onClick={boardClickHandler} >
                게시판
                <ul className={cn("hide-btn",{hovers:hovers})}>
                    <li>
                      <Link to="/board/main">자유게시판</Link>
                    </li>
                    <li>
                      <Link to="/">LCK</Link>
                    </li>
                    <li>
                      <Link to="/">공략게시판</Link>
                    </li>
                    <li>
                      <Link to="/">하이라이트</Link>
                    </li>
                </ul>
              </div>
              <Link to="/" className="nav-item" active-color="red">미니게임</Link>
              <Link to="/" className="nav-item" active-color="rebeccapurple">트롤사형투표</Link>
              <span className="nav-indicator"></span>
              {isInput === true && <SearchBox/>}
            </ul>
            <ul className="certification__box">
              {isLogin === true && <LoginBtn/>}
              {isProfile === true && <Profile/>}

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
