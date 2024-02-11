import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/Profile.scss';
import {getCurrentLoginUser} from "../../../utils/login-util";
import {Link} from "react-router-dom";
const Profile = props => {
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [imgUrl, setImgUrl] = useState(null);

    const getProfile=async ()=>{
        await fetch(`/user/load-profile`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(async res => {
            if (res.status === 200) {
                console.log("잘 옴");
                const profileData = await res.blob();
                // blob이미지를 url로 변환
                const imgUrl = window.URL.createObjectURL(profileData);
                console.log('imgUrl DB에서 넘어온거');
                console.log(imgUrl);
                setImgUrl(imgUrl);
            }
        })
    }
    useEffect(() => {
        getProfile();
    }, []);

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