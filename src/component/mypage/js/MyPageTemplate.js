import React, {useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./MyPageProfile";

const MypageTemplate= () => {
    const [mains, setMains]=useState(1);
    return (
        <div className="mypage">
            <MypageSideMenu />

            <MyPageProfile />
        </div>
    );
};

export default MypageTemplate;