import React, {useState} from 'react';
import "../scss/Login.scss";
import {Link, Route, Routes} from "react-router-dom";
import {USER_URL} from "../../../../config/host-config";

const Login = () => {
    const SIGN_IN_URL = USER_URL + "/signin";

    const [userValue, setUserValue] = useState({
        id: '',
        password: ''
    });


    // email확인
    const emailHandler =  async (id) => {
        const res = await fetch( SIGN_IN_URL);
    }

    // password확인
    const passwordHandler = e => {

    }

    return (
        <div className={'loginform'}>
            <div className={'loginform-container'}>
                <div className={'login-box loginform-box'}>
                    <div className={'login-input-container'}>
                        <input className={'login-inputbox'} type="text" placeholder={'account'}
                               onChange={emailHandler}/>
                        <div className={'line'}></div>
                        <input className={'login-inputbox'} type="text" placeholder={'password'}
                                onChange={passwordHandler}/>
                    </div>
                    <div className={'signin-box'}><a>로그인</a></div>
                </div>
                <div className={'login-box easylogin-box'}>
                    <div className={'easy-login-text'}><a>간편로그인</a></div>
                    <div className={'easy-login'}>
                        <div className={'easy-login-google'}></div>
                        <div className={'easy-login-kakao'}></div>
                    </div>
                </div>
                <div className={'login-box loginhelper'}>
                    <div className={'login-helper-box'}>
                        <div className={'login-helper'}>
                            <Link to='/template/pwreset' >비밀번호 찾기</Link>
                        </div>
                        <div className={'line2'}></div>
                        <div className={'login-helper sign-up'}>
                            <Link to='/template/signup' >회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;