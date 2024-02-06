import React, {useEffect, useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./profile/MyPageProfile";
import MyInformation from "./info/MyInformation";
import MyActivityMain from "./activity/MyActivityMain";
import {getCurrentLoginUser} from "../../../utils/login-util";

const MyPageTemplate = () => {
    //mypage 렌더링 유형을 저장
    const [pageType, setPageType] = useState(1);

    // 유저 정보를 저장할
    const [userInfo , setUserInfo] = useState({
        joinMembershipDate:"",
        profileImage:null,
        userId: "",
        userName:""
    });

    // 이미지 URL을 저장할 상태변수
    const [imgUrl, setImgUrl] = useState(null);

    // 토큰 가져오기
    const token= getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686/user";

    const userInfoFetch = async () =>{
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            setUserInfo(json);
        } catch (error) {
            console.error('사용자 정보를 불러오는 중 오류 발생:', error);
        }

        const url = API_URL + "/load-profile";
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCurrentLoginUser().token
            }
        });
    };

    useEffect(() => {
        userInfoFetch();
    }, []);


    const changeUser = (user) =>{
        setUserInfo(user)
    }


    const changeType = (type)=>{
        setPageType(type)
    }
    return (
        <div className="mypage">
            <MypageSideMenu changeType={changeType} />
            {pageType === 1 && <MyPageProfile userInfo={userInfo} imgUrl={imgUrl}/>}
            {pageType === 2 && <MyInformation userInfo={userInfo} changeUser ={changeUser} />}
            {pageType === 3 && <MyActivityMain/>}
        </div>
    );
};

export default MyPageTemplate;