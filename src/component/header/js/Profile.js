import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/Profile.scss';
import {getCurrentLoginUser} from "../../../utils/login-util";
import {Link} from "react-router-dom";
import {USER_URL} from "../../../config/host-config";
const Profile = ({profile,nickname}) => {
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [imgUrl, setImgUrl] = useState(undefined);
    const API_URL = "http://localhost:8686/user";

    const userProfileFetch = async () =>{
        setTimeout(async () => {
            const url = USER_URL + "/load-profile";
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                const profileData = await res.text();

                // blob이미지를 url로 변환
                console.log(profileData);
                setImgUrl(profileData);
            }
        }, 200);

    }
    const imgRef = useRef(null);

    useEffect(() => {
        userProfileFetch();
    }, [profile]);

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = imgUrl;
        }
    }, [imgUrl]);
    let src;
    src = process.env.PUBLIC_URL + "/defaultUser.jpg";
    return (
        <>
            <Link className='profile__box' to="/mypage">
                <img className='profile' alt='흠냐' src={!imgUrl?src:imgUrl}/>
                <span className='nickname'>{nickname?nickname:getCurrentLoginUser().username}</span>
            </Link>
        </>
    );
};

Profile.propTypes = {

};

export default Profile;