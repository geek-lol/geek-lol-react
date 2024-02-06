import React, {useEffect, useState} from 'react';
import MyProfile from '../../scss/MyPageProfile.scss';
import {getCurrentLoginUser} from "../../../../utils/login-util";
import async from "async";
import axios from "axios";

const MyPageProfile = ({userInfo,imgUrl,changeImg,alterImgFetch}) => {

    //프로필 이미지 파일을 상태변수로 관리
    const [imgFile, setImgFile] = useState(null);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    //파일 선택시 썸넬 화면에 렌더링
    function showThumbnailHandler(e) {
        alterImgFetch()
        // 첨부된 파일의 데이터를 가져오기
        const file = document.getElementById('profile-img').files[0];
        changeImg(file);
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () =>{
            setImgFile(reader.result)
        }
    }
    function thumbnailCLickHandler() {
        document.getElementById('profile-img').click();
    }

    return (
        <div className="my-user-wrapper">
            <div className="profile-img-box">
                <div className=" thumbnail-box" onClick={thumbnailCLickHandler}>
                    <img className="my-user-img"
                         src={imgUrl}
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
                    <div className="my-start-date">GEEKLOL 가입날짜:{formatDate(userInfo.joinMembershipDate)}</div>
                </div>
                <div className="my-profile-active">
                    <div className="active-item">
                        <div className="active-type">내 글</div>
                        <div className="active-count">3</div>
                    </div>
                    <div className="active-item">
                        <div className="active-type">내 댓글</div>
                        <div className="active-count">3</div>
                    </div>
                    <div className="active-item">
                        <div className="active-type">제재내역</div>
                        <div className="active-count">3</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageProfile;