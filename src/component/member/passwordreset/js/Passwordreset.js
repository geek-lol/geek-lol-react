import React from 'react';
import "../scss/Passwordreset.scss"

const Passwordreset = () => {
    return (
        <div className={'pwr-container'}>
            <div className={'pwr-textbox'}>
                <a className={'textbox1'}>비밀번호 재설정</a>
                <a className={'textbox2'}>가입된 이메일로 비밀번호를 재설정할 수 있는 링크가 전송됩니다.</a>
            </div>
            <div className={'pwr-input-box'} >
                <a className={'input-textbox'}>이메일</a>
                <input className={'pwr-input'} type="text"/>
            </div>
            <div className={'pwr-button-box'}>
                <a className={'button-textbox'}>비밀번호 재설정</a>
            </div>
        </div>
    );
};

export default Passwordreset;