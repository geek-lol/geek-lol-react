import React, {Component, useEffect, useState} from "react";
import "../scss/Header.scss";
import {TiThMenu} from "react-icons/ti";
import LoginBtn from "./LoginBtn";
import SearchBox from "./SearchBox";
import Profile from "./Profile";
import MenuModal from "./MenuModal";
import {Link, useLocation, useNavigate} from "react-router-dom";
import cn from "classnames";
import {getCurrentLoginUser, isLogin} from "../../../utils/login-util";

const Header = ({sendTouch,profile}) => {
    //boardHeader 상태변수
    //nav 시작
    const [hovers1, sethover1] = useState(false);
    const [hovers2, sethover2] = useState(false);
    const boardClickHandler1 = (e) => {
        sethover1(!hovers1);
    }
    const boardClickHandler2 = (e) => {
        // console.log(e.target);
        sethover2(!hovers2);
    }
    const boardOtherClickHandler = (e) => {
        if (!e.target.closest('.b1')) {
            sethover1(false);
        }
        if (!e.target.closest('.b2')) {
            sethover2(false);
        }
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
    const [menu, setMenu] = useState(false);
    const [isInput, setIsInput] = useState(true);
    const [isLoggedIn, setIsLogin] = useState(false);
    const location = useLocation();
    const[role,setRole]=useState(getCurrentLoginUser().role);

    useEffect(() => {
        const path = location.pathname;
        const isMainInPath = path.length > 1 && path !== "/";
        setIsInput(isMainInPath);
    }, [location.pathname]);
    useEffect(() => {
        setIsLogin(isLogin());
        const a = getCurrentLoginUser();
    }, [isLogin()]);
    const findPage = () => {
        if (window.location.href.includes("main")) {
            setIsInput(false);
        }
    }
    useEffect(() => {
        findPage();
        document.addEventListener('click', (e) => {
            boardOtherClickHandler(e);
        });

    }, []);
    const useWindowSizeBelow1400 = () => {
        const [isBelow1400, setIsBelow1400] = useState(window.innerWidth <= 1400);

        useEffect(() => {
            const handleResize = () => {
                setIsBelow1400(window.innerWidth <= 1400);
            };

            window.addEventListener("resize", handleResize);

            // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);

        return isBelow1400;
    };
    const isBelow1400 = useWindowSizeBelow1400();


    function menuHandler() {
        setMenu(!menu);
    }

    //모달 터치 이벤트 상태변경 함수
    const modalTouchHandler = (e) => {
        sendTouch(e);
    }

    const redirect = useNavigate();

    const moveToHome = (e) => {
        redirect("/")
    };

    return (
        <div>
            <header id="header">
                <nav id="nav-box">
                    <div className="logo__box">
                        <p className="logo" onClick={moveToHome}>
                            <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지"/>
                        </p>
                    </div>
                    <div className="content__box">
                        <p className="nav-item is-active" active-color="orange"
                           onClick={(e) => {handleIndicator(e.target);moveToHome()}}>홈</p>
                        <Link to="/rank" className="nav-item" active-color="green"
                              onClick={(e) => handleIndicator(e.target)}>랭킹</Link>
                        <div className="nav-item board-btn b1" active-color="blue"
                             onClick={(e) => {
                                 handleIndicator(e.target);
                                 boardClickHandler1(e);
                             }}>게시판
                            <ul className={cn("hide-btn btn1", {hovers1: hovers1})}>
                                <li>
                                    <Link to="/board/main/FreeBoard" className="c1"
                                          onClick={modalTouchHandler}>자유게시판</Link>
                                </li>
                                <li>
                                    <Link to="/board/main/Request" className="c2"
                                          onClick={modalTouchHandler}>트롤재판소</Link>
                                </li>
                                <li>
                                    <Link to="/board/shorts" className="c3"
                                          onClick={modalTouchHandler}>하이라이트</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-item board-btn b2" active-color="red"
                             onClick={(e) => {
                                 handleIndicator(e.target);
                                 boardClickHandler2(e);
                             }}>
                            <ul className={cn("hide-btn btn2", {hovers2: hovers2})}>
                                <li>
                                    <Link to="/csgame">막타 치기</Link>
                                </li>
                                <li>
                                    <Link className="atext" to="/resgame">반응속도테스트</Link>
                                </li>
                            </ul>
                            미니게임
                        </div>
                        {role==="ADMIN"?<Link className="nav-item" active-color="yellowgreen"
                           onClick={(e) => handleIndicator(e.target)} to="/admin">어드민</Link>:null}
                        <span className="nav-indicator" style={{
                            width: indicatorStyle.width,
                            left: indicatorStyle.left,
                            backgroundColor: indicatorStyle.backgroundColor
                        }}></span>
                        {!isBelow1400?
                            isInput === true && <SearchBox/>:null}
                    </div>
                    <ul className="certification__box">
                        {isLoggedIn ? <Profile profile={profile}/> : <LoginBtn/>}
                    </ul>

                </nav>
            </header>
            <div className="nav_toggle_Btn" onClick={menuHandler} modalTouchHandler={modalTouchHandler}>
                <TiThMenu/>
            </div>
            {isBelow1400?<MenuModal menu={menu} isLogin={isLoggedIn}/>:null}
        </div>
    );
}


Header.propTypes = {};

export default Header;
