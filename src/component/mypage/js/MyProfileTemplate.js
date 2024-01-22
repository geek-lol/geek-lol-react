import React, {useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./MyPageProfile";
import MyInformation from "./MyInformation";

const MyProfileTemplate= () => {
    return (
        <div className="mypage">
            <MypageSideMenu />
            <MyPageProfile />
        </div>
    );
};

export default MyProfileTemplate;