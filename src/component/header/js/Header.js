import React, {Component, useEffect, useState} from "react";
import "../scss/Header.scss";
import { TiThMenu } from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import Profile from "./Profile";
import MenuModal from "./MenuModal";
import {Link} from "react-router-dom";
import cn from "classnames";

const Header =()=> {
  //nav 시작
  const [hovers1,sethover1]=useState(false);
  const [hovers2,sethover2]=useState(false);
  const boardClickHandler1=(e)=>{
    console.log(e.target);
    sethover1(!hovers1);
  }
  const boardClickHandler2=(e)=>{
    console.log(e.target);
    sethover2(!hovers2);
  }
  const boardOtherClickHandler=(e)=>{
    if(!e.target.closest('.b1')){sethover1(false);}
    if(!e.target.closest('.b2')){sethover2(false);}
  }
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: '0px',
    left: '0px',
    backgroundColor: '',
  });
  useEffect(() => {
    // 초기 렌더링 시 Home에 해당하는 스타일을 설정
    const homeItem = document.querySelector('.nav-item.is-active');
    if (homeItem) {
      const initialStyle = {
        width: `${homeItem.offsetWidth}px`,
        left: `${homeItem.offsetLeft}px`,
        backgroundColor: homeItem.getAttribute('active-color'),
      };
      setIndicatorStyle(initialStyle);
    }
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const handleIndicator = (el) => {
    const newStyle = {
      width: `${el.offsetWidth}px`,
      left: `${el.offsetLeft}px`,
      backgroundColor: el.getAttribute('active-color'),
    };

    setIndicatorStyle(newStyle);

    // is-active 클래스와 color 속성을 설정하는 부분은 CSS에서 처리하도록 합니다.
  };
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
      document.addEventListener('click',(e)=>{boardOtherClickHandler(e);} );

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
                <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지"/>
              </Link>
            </div>
            <div className="content__box">
              <Link to="/" className="nav-item is-active" active-color="orange"
                 onClick={(e) => handleIndicator(e.target)}>홈</Link>
              <Link to="/rank" className="nav-item" active-color="green" onClick={(e) => handleIndicator(e.target)}>랭킹</Link>
              <Link to="#" className="nav-item board-btn b1" active-color="blue"
                    onClick={(e) => {handleIndicator(e.target); boardClickHandler1(e);}}>게시판
                <ul className={cn("hide-btn btn1", {hovers1: hovers1})}>
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
              </Link>
              <Link to="#" className="nav-item board-btn b2" active-color="red"
                    onClick={(e) => {handleIndicator(e.target); boardClickHandler2(e);}}>
                <ul className={cn("hide-btn btn2", {hovers2: hovers2})}>
                  <li>
                    <Link to="/">민희언 주기깅</Link>
                  </li>
                  <li>
                    <Link to="/">킹컴타자연습</Link>
                  </li>
                </ul>
                미니게임</Link>
              <Link to="/" className="nav-item" active-color="yellowgreen"
                    onClick={(e) => handleIndicator(e.target)}>트롤사형투표</Link>
              <span className="nav-indicator" style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
                backgroundColor: indicatorStyle.backgroundColor
              }}></span>
              {isInput === true && <SearchBox/>}
            </div>
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
