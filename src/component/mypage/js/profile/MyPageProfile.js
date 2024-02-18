import React, {useEffect, useState} from 'react';
import MyProfile from '../../scss/MyPageProfile.scss';
import {getCurrentLoginUser} from "../../../../utils/login-util";
import defaultImg from "../../../../image/profile.jpg";
import {formatDate} from "../../../../utils/format-date";
import {USER_URL} from "../../../../config/host-config";

const MyPageProfile = ({userInfo,myActivity,profileSet}) => {

    // 이미지 URL을 저장할 상태변수
    const [imgUrl, setImgUrl] = useState(null);

    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686/user";

    useEffect(() => {
        userProfileFetch();
    }, []);


    //회원 이미지 가져오기 fetch
    const userProfileFetch = async () =>{
        const url = USER_URL + "/load-profile";
        console.log(`url:${url}`);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status === 200) {
            const profileData = await res.text();

            console.log(profileData)
            setImgUrl(profileData);
        }
        profileSet(imgUrl);
    }
    //회원 이미지 변경 fetch
    const alterImgFetch= async (file)=>{
        const payload = {
            id : userId
        }
        const jsonBlob = new Blob(
            [JSON.stringify(payload)],
            {type:'application/json'});

        const formData = new FormData();
        formData.append('user',jsonBlob);
        formData.append('profileImage',file);
        const res = await fetch(USER_URL+"/modify",{
            method:"PUT",
            headers: {"Authorization" : `Bearer ${token}`},
            body: formData
        })

        if (res.status === 200) {
            const json = await res.json();

        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }
    //파일 선택시 썸넬 화면에 렌더링
    function showThumbnailHandler(e) {
        profileSet(e);
        // 첨부된 파일의 데이터를 가져오기
        const file = document.getElementById('profile-img').files[0];

        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () =>{
            setImgUrl(reader.result);
            profileSet(reader.result);
        }
        alterImgFetch(file);
        profileSet(reader.result);
    }
    function thumbnailCLickHandler() {
        document.getElementById('profile-img').click();
    }

    return (
        <div className="my-user-wrapper">
            <div className="profile-img-box">
                <div className=" thumbnail-box" onClick={thumbnailCLickHandler}>
                    <img className="my-user-img"
                         src={imgUrl || defaultImg}
                         alt="profile"
                    />
                </div>
                <label className='signup-img-label' htmlFor='profile-img'>프로필 이미지 수정</label>
                <input
                    id='profile-img'
                    type='file'
                    style={{display: 'none'}}
                    accept='image/*'
                    onChange={showThumbnailHandler}
                />
            </div>

            <div>
                <div className="my-user-info">
                    <div className="my-user-name">{userInfo.userName}</div>
                    <div className="my-start-date">GEEKLOL 가입날짜:{formatDate(userInfo.joinMembershipDate,'day')}</div>
                </div>
                <div className="my-profile-active">
                    <div className="active-item">
                        <div className="active-type">내 글</div>
                        <div className="active-count">{myActivity.boardCount}</div>
                    </div>
                    <div className="active-item">
                        <div className="active-type">내 댓글</div>
                        <div className="active-count">{myActivity.replyCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageProfile;