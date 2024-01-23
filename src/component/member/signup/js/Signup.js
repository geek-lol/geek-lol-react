import React from 'react';
import "../scss/Signup.scss";

const Signup = () => {
    return (
        <div className={'signup-container'}>
            <div className={'signup-textbox'}>
                <p> 이메일 회원가입</p>
            </div>
            <div className={'signup-input-box'}>
                <p className={'input-textbox'}>이메일</p>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <p className={'input-textbox'}>닉네임</p>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <p className={'input-textbox'}>비밀번호</p>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-input-box'}>
                <p className={'input-textbox'}>비밀번호 확인</p>
                <input className={'signup-input'} type="text"/>
            </div>
            <div className={'signup-button-box'}>
                <p className={'button-textbox'}>회원가입</p>
            </div>
        </div>
    );
};

export default Signup;