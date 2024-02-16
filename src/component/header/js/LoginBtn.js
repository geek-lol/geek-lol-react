import React from 'react';
import PropTypes from 'prop-types';
import '../scss/LoginBtn.scss'
import {Link} from "react-router-dom";

const LoginBtn = props => {
    return (
        <>
                    <Link to={'/template/login'} className="login__Btn">로그인</Link>
        </>
    );
};

LoginBtn.propTypes = {};

export default LoginBtn;