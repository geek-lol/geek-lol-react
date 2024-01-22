import React, {useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./MyPageProfile";
import MyInformation from "./MyInformation";

const MypageTemplate= () => {
    const [mains, setMains]=useState(1);
    return (
        <div className="mypage">
            <MypageSideMenu />

            {/*<MyPageProfile />*/}
            <MyInformation />
        </div>
    );
};

export default MypageTemplate;