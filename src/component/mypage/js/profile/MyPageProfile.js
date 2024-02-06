import React, {useEffect, useState} from 'react';
import MyProfile from '../../scss/MyPageProfile.scss';
import {getCurrentLoginUser} from "../../../../utils/login-util";
import async from "async";
import axios from "axios";

const MyPageProfile = ({userInfo,imgUrl}) => {

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="my-user-wrapper">
            <img className="my-user-img" src={{imgUrl}}
                 alt="프로필 이미지" />
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