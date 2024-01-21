import React from 'react';
import mp from './MypageSideMenu.scss';

const MypageSideMenu = () => {
    return (
        <div className="my-sidemenu-wrapper">
            <div className="my-side-head">내 계정</div>
            <ul className="my-sidemenu">
                <li className="menu-item s-gray">
                    프로필
                </li>
                <li className="menu-item">
                    <div className="div15">계정 관리</div>
                </li>
                <li className="menu-item">
                    <div className="div15">내 활동</div>
                </li>
                <li className="menu-item">
                    <div className="div15">로그아웃</div>
                </li>
            </ul>
        </div>

    );
};

export default MypageSideMenu;