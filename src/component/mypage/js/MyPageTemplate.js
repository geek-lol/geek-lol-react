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
        userId: "",
        userName:""
    });

    // 이미지 URL을 저장할 상태변수
    const [imgUrl, setImgUrl] = useState(null);

    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686/user";

    //회원 이미지 가져오기 fetch
    const userProfileFetch = async () =>{
        const url = API_URL + "/load-profile";
        console.log(`url:${url}`);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res);
        if (res.status === 200) {
            const profileData = await res.blob();

            // blob이미지를 url로 변환
            const imgUrl = window.URL.createObjectURL(profileData);
            console.log('imgUrl DB에서 넘어온거')
            console.log(imgUrl)
            setImgUrl(imgUrl);
        } else {
            const errMsg = await res.text();
            setImgUrl(null);
        }
    }
    //회원정보 가져오기 fetch
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
        userProfileFetch();
    };

    //회원 이미지 변경 fetch
    const alterImgFetch= async ()=>{
        const payload = {
            id : userId
        }
        const jsonBlob = new Blob(
            [JSON.stringify(payload)],
            {type:'application/json'});

        const formData = new FormData();
        formData.append('user',jsonBlob);
        formData.append('profileImage',imgUrl);
        const res = await fetch(API_URL+"/modify",{
            method:"POST",
            headers: {"Authorization" : `Bearer ${token}`},
            body: formData
        })

        if (res.status === 200) {
            const json = await res.json();
            console.log(json);

        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }

    // //imgUrl 변경시 실행
    // useEffect(() => {
    //     setUserInfo(prevState => ({
    //         ...prevState,
    //         profileImage:imgUrl,
    //     }))
    //     userProfileFetch();
    //     console.log("imgUrl!!")
    //     console.log(imgUrl)
    // }, [imgUrl]);

    //페이지 로드시 실행
    useEffect(() => {
        userInfoFetch();
    }, []);


    //하위 컴포넌트에서 imgUrl변경
    const changeImg = (img)=>{
        setImgUrl(img)
    }
    //하위 컴포넌트에서 userInfo변경
    const changeUser = (user) =>{
        setUserInfo(user)
    }
    //하위 컴포넌트에서 type 변경
    const changeType = (type)=>{
        setPageType(type)
    }
    return (
        <div className="mypage">
            <MypageSideMenu changeType={changeType} />
            {pageType === 1 && <MyPageProfile userInfo={userInfo}
                                              imgUrl={imgUrl} changeImg={changeImg}
                                              alterImgFetch={alterImgFetch}            />}
            {pageType === 2 && <MyInformation userInfo={userInfo} changeUser ={changeUser} />}
            {pageType === 3 && <MyActivityMain/>}
        </div>
    );
};

export default MyPageTemplate;