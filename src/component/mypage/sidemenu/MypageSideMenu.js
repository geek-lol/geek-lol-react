import React from 'react';
import mp from './MypageSideMenu.scss';

const MypageSideMenu = () => {
    return (
        <div className="my-sidemenu-wrapper">
            <h2>내 계정</h2>
            <ul className="my-sidemenu">
                <li className="menu-item">
                    <div className="div13">프로필</div>
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