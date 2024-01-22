import React from 'react';
import MyProfile from '../sass/MyPageProfile.scss';

const MyPageProfile = () => {
    return (
        <div className="my-user-wrapper">
            <img className="my-user-img" src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/588.png"
                 alt="프로필 이미지" />
            <div>
                <div className="my-user-info">
                    <div className="my-user-name">어쩔티시비ㅏㄹ</div>
                    <div className="my-start-date">GEEKLOL 가입날짜:2023-01-01</div>
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
                        <div className="active-type">제제내역</div>
                        <div className="active-count">3</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageProfile;