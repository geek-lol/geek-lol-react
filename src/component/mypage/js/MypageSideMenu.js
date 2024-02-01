import React, {useEffect, useState} from 'react';
import '../scss/MypageSideMenu.scss';
import {Link, useLocation} from "react-router-dom";
import cn from 'classnames';


const MypageSideMenu = () => {

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
                    <Link className="item-text" to="/logout">로그아웃</Link>
                </li>
            </ul>
        </div>

    );
};

export default MypageSideMenu;