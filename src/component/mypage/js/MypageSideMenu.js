import React from 'react';
import mp from '../sass/MypageSideMenu.scss';
import {Link} from "react-router-dom";


const MypageSideMenu = () => {
    return (
        <div className="my-sidemenu-wrapper">
            <div className="my-side-head">내 계정</div>
            <ul className="my-sidemenu">
                <li className="menu-item s-gray">
                    <Link className="item-text" to="/mypage">프로필</Link>
                </li>
                <li className="menu-item">
                    <Link className="item-text" to="/mypage/info">계정 관리</Link>
                </li>
                <li className="menu-item">
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