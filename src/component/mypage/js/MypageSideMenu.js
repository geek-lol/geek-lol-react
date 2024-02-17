import React, {useEffect, useState} from 'react';
import '../scss/MypageSideMenu.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import cn from 'classnames';


const MypageSideMenu = ({changeType}) => {
    //리다이렉션 변수
    const redirection = useNavigate();
    const [selectType,setSelectType] = useState({
        profile : true,
        info : false,
        activity : false
    })
    const onClickHandler = (e)=>{
        const target = e.target;
        switch (target.id){
            case "profile":
                changeType(1);
                setSelectType({
                    profile: true,
                    info: false,
                    activity : false
                })
                break;
            case "userSetting":
                changeType(2);
                setSelectType({
                    profile: false,
                    info: true,
                    activity : false
                })
                break;
            case "activity":
                changeType(3)
                setSelectType({
                    profile: false,
                    info: false,
                    activity : true
                })
                break;
            default:
                setSelectType({
                    profile: true,
                    info: false,
                    activity: false
                })
        }
    }

    const logOutHandler = () => {
        localStorage.clear()
        redirection('/template/login');
    };
    return (
        <div className="my-sidemenu-wrapper">
            <div className="my-side-head">내 계정</div>
            <ul className="my-sidemenu">
                <li id="profile" className={cn('menu-item', {sgray:selectType.profile})} onClick={onClickHandler}>
                    프로필
                </li>
                <li id="userSetting" className={cn('menu-item', {sgray:selectType.info})}  onClick={onClickHandler}>
                    계정 관리
                </li>
                <li id="activity" className={cn('menu-item', {sgray:selectType.activity})}  onClick={onClickHandler}>
                    내 활동
                </li>
                <li className="menu-item">
                    <div onClick={logOutHandler} className="item-text" to="/logout">로그아웃</div>
                </li>
            </ul>
        </div>

    );
};

export default MypageSideMenu;