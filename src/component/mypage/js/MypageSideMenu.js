import React, {useEffect, useState} from 'react';
import '../scss/MypageSideMenu.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import cn from 'classnames';


const MypageSideMenu = () => {

    //리다이렉션 변수
    const redirection = useNavigate();


    const [selectType,setSelectType] = useState({
        profile : true,
        info : false,
        activity : false
    })
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        switch (location.pathname){
            case "/mypage" :
                setSelectType({
                    profile: true,
                    info: false,
                    activity : false
                })
                break;
            case "/mypage/info":
                setSelectType({
                    profile: false,
                    info: true,
                    activity : false
                })
                break;
            case "/mypage/active":
                setSelectType({
                    profile: false,
                    info: false,
                    activity : true
                })
                break;
            default :
                setSelectType({
                    profile: true,
                    info: false
                })

        }
    }, [location]);

    const logOutHandler = () => {
        localStorage.clear()
        redirection('/login');
    };
    return (
        <div className="my-sidemenu-wrapper">
            <div className="my-side-head">내 계정</div>
            <ul className="my-sidemenu">
                <li className={cn('menu-item', {sgray:selectType.profile})}>
                    <Link className="item-text" to="/mypage" >프로필</Link>
                </li>
                <li className={cn('menu-item', {sgray:selectType.info})}>
                    <Link className="item-text" to="/mypage/info">계정 관리</Link>
                </li>
                <li className={cn('menu-item', {sgray:selectType.activity})}>
                    <Link className="item-text" to="/mypage/active">내 활동</Link>
                </li>
                <li className="menu-item">
                    <div onClick={logOutHandler} className="item-text" to="/logout">로그아웃</div>
                </li>
            </ul>
        </div>

    );
};

export default MypageSideMenu;