import React from 'react';
import MypageSideMenu from "../../sidemenu/MypageSideMenu";
import MyPageProfile from "./MyPageProfile";

const MypageTemplate= () => {
    return (
        <div className="mypage">
            <MypageSideMenu />
            <MyPageProfile />
        </div>
    );
};

export default MypageTemplate;