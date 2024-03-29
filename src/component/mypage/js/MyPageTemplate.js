import React, {useEffect, useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./profile/MyPageProfile";
import MyInformation from "./info/MyInformation";
import MyActivityMain from "./activity/MyActivityMain";

import {getCurrentLoginUser} from "../../../utils/login-util";
import async from "async";
import {COUNT_URL, USER_URL} from "../../../config/host-config";

const MyPageTemplate = ({profileSet,getNickname}) => {
    //mypage 렌더링 유형을 저장
    const [pageType, setPageType] = useState(1);

    const [myActivity, setMyActivity] = useState({
        boardCount : 0,
        replyCount : 0
    })

    // 유저 정보를 저장할
    const [userInfo , setUserInfo] = useState({
        joinMembershipDate:"",
        userId: "",
        userName:""
    });
    // 유저 정보가 변하는지 감지하는 변수
    const [userState , setUserState] = useState(false);
    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686";

    //회원정보 가져오기 fetch
    const userInfoFetch = async () =>{
        try {
            const response = await fetch(USER_URL, {
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
    };

    //내 활동내역 카운트 가져오기 fetch
    const myActivityCount = async ()=>{
        const res = await fetch(COUNT_URL,{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await res.json();
        setMyActivity(json);
    }
    //하위 컴포넌트에서 userInfo변경
    const changeUser = (user) =>{
        setUserInfo(prevState => ({
            ...prevState,
            user
        }))
        setUserState(!userState);
    }
    //하위 컴포넌트에서 type 변경
    const changeType = (type)=>{
        setPageType(type)
    }
    useEffect(() => {
        userInfoFetch()
    }, [userState]);
    useEffect(() => {
        myActivityCount();
    }, []);
    return (
        <div className="mypage">
            <MypageSideMenu changeType={changeType} />
            {pageType === 1 && <MyPageProfile userInfo={userInfo} myActivity={myActivity} profileSet={profileSet} />}
            {pageType === 2 && <MyInformation userInfo={userInfo} changeUser ={changeUser} getNickname={getNickname} />}
            {pageType === 3 && <MyActivityMain />}
        </div>
    );
};

export default MyPageTemplate;