import React from 'react';
import PropTypes from 'prop-types';
import '../scss/LoginBtn.scss'

const LoginBtn = props => {
    return (
        <>
            <ul className="certification__box">
                    <a className="login__Btn">로그인</a>
            </ul>
        </>
    );
};

LoginBtn.propTypes = {};

export default LoginBtn;