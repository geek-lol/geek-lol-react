import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Profile.scss';
import {getCurrentLoginUser} from "../../../utils/login-util";
import {Link} from "react-router-dom";
const Profile = props => {

    let src;
    src = require('../../../image/profile.jpg');
    return (
        <>
            <Link className='profile__box' to="/mypage">
                <img className='profile' alt='흠냐' src={src}/>
                <span className='nickname'>{getCurrentLoginUser().username}</span>
            </Link>
        </>
    );
};

Profile.propTypes = {

};

export default Profile;