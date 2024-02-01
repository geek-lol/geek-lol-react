import React from 'react';
import MypageSideMenu from "../MypageSideMenu";
import MyActivityMain from "./MyActivityMain";

const MyActivityTemplate = () => {
    return (
        <div className="mypage">
            <MypageSideMenu />
            <MyActivityMain />
        </div>
    );
};

export default MyActivityTemplate;