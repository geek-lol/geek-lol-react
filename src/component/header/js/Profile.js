import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Profile.scss';
const Profile = props => {

    let src;
    src = require('../../../image/profile.jpg');
    return (
        <>
            <div className='profile__box'>
                <img className='profile' alt='흠냐' src={src}/>
                <span className='nickname'>모가지캔디모</span>
            </div>
        </>
    );
};

Profile.propTypes = {

};

export default Profile;