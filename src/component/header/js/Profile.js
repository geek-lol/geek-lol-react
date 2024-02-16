import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/Profile.scss';
import {getCurrentLoginUser} from "../../../utils/login-util";
import {Link} from "react-router-dom";
const Profile = props => {
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [imgUrl, setImgUrl] = useState(null);
    const API_URL = "http://localhost:8686/user";

    const userProfileFetch = async () =>{
        const url = API_URL + "/load-profile";
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status === 200) {
            const profileData = await res.blob();

            // blob이미지를 url로 변환
            const imgUrl = window.URL.createObjectURL(profileData);
            console.log(imgUrl);
            setImgUrl(imgUrl);
        }
    }
    useEffect(() => {
        userProfileFetch();
    }, [setImgUrl]);
    let src;
    src = require('../../../image/profile.jpg');
    return (
        <>
            <Link className='profile__box' to="/mypage">
                <img className='profile' alt='흠냐' src={!imgUrl?src:imgUrl}/>
                <span className='nickname'>{getCurrentLoginUser().username}</span>
            </Link>
        </>
    );
};

Profile.propTypes = {

};

export default Profile;