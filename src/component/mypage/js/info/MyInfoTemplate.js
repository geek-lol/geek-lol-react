import React, {useState} from 'react';
import MypageSideMenu from "../MypageSideMenu";
import MyPageProfile from "../profile/MyPageProfile";
import MyInformation from "./MyInformation";

const MyProfileTemplate= () => {
    return (
        <div className="mypage">
            <MypageSideMenu />
            <MyInformation />
        </div>
    );
};

export default MyProfileTemplate;