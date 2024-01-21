import React from 'react';
import MypageSideMenu from "../../sidemenu/MypageSideMenu";
import MyPageProfile from "./MyPageProfile";

const MypageTemplate= () => {
    return (
        <div>
            <MypageSideMenu />
            <MyPageProfile />
        </div>
    );
};

export default MypageTemplate;