import React, {useState} from 'react';
import "../scss/Login.scss";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {USER_URL} from "../../../../config/host-config";

const Login = () => {
    const SIGN_IN_URL = USER_URL + "/signin";
    const redirection = useNavigate();

    const [autoLogin, setAutoLogin] = useState(false);



    // 로그인
    const fetchLoginProcess =  async () => {
        const res = await fetch(SIGN_IN_URL,{
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: document.getElementById('email').value,
                password: document.getElementById('password').value,
                autoLogin: autoLogin
            })
        });

        if (res.status === 400) { // 가입이 안되었거나 비번이 틀린 경우
            // 서버에서 온 텍스트를 추출
            const text = await res.text();
            alert(text);
            return;
        }

        if (res.status === 200) {
            const {token, userName, role, id} = await res.json();
            // const responseData = await res.json();
            // 클라이언트에서 로그인을 했다는 사실을 알게 해야함
            // 서버에서 받은 토큰을 브라우저에 저장할것.
            // 1. 로컬 스토리지 - 데이터를 브라우저가 종료되어도 계속 보관
            // 2. 세션 스토리지 - 데이터를 브라우저가 종료되는 순간 삭제함
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('USER_NAME', userName);
            localStorage.setItem('ROLE', role);
            localStorage.setItem('USER_ID', id);

            redirection('/');
        }
    }


    const loginHandler = e => {
        e.preventDefault();
        fetchLoginProcess();
    }

    const autoLoginHandler = e => {
        setAutoLogin(!autoLogin);
        console.log(autoLogin)
    }

    return (
        <div className={'loginform'}>
            <form noValidate className={'loginform-container'}>
                <div className={'login-box loginform-box'}>
                    <div className={'login-input-container'}>
                        <input className={'login-inputbox'} id={'email'} type="email" placeholder={'email'}/>
                        <div className={'line'}></div>
                        <input className={'login-inputbox'} id={'password'} type="password" placeholder={'password'}/>
                    </div>
                    <div className={'auto-login-check'}>
                        <input type="checkbox" onClick={autoLoginHandler}/>
                        <p>자동로그인</p>
                    </div>
                    <button className={'signin-box'} onClick={loginHandler}>로그인</button>
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
            </form>

        </div>
    );
};

export default Login;