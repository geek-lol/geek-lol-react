import React from 'react';
import "../scss/Signup.scss";

const Signup = () => {
    return (
        <div className={'signup-container'}>
            <div className={'signup-textbox'}>
                <a> 이메일 회원가입</a>
            </div>
            <div className={'signup-input-box'}>
                <a className={'input-textbox'}>이메일</a>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <a className={'input-textbox'}>닉네임</a>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <a className={'input-textbox'}>비밀번호</a>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <a className={'input-textbox'}>비밀번호 확인</a>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-button-box'}>
                <a className={'button-textbox'}>회원가입</a>
            </div>
        </div>
    );
};

export default Signup;