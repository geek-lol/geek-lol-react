import React, {useState} from 'react';
import {TextField} from "@mui/material";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import "../../scss/MyInformation.scss";

const MyInfoAlterPw = ({changePwStatus,changeUser}) => {
    //요청 URL
    const API_URL = "http://localhost:8686/user/modify";
    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().userId;

    // 상태변수로 회원가입 입력값 관리
    const [userPassword, setUserPassword] = useState({
        password: '',
        newPassword: '',
        reNewPassword: ''
    });

    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        newPassword: '',
        reNewPassword: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        password: false,
        newPassword: false,
        reNewPassword: false
    });

    //패스워드 검증 fetch
    const pwCheckFetch = async (pw)=>{
        let msg = '', flag = false;

        const res = (await fetch("http://localhost:8686/user/pwcheck?pw=" + pw,{
            method:"GET",
            headers: {"Authorization" : `Bearer ${token}`},
        }))
        const json = await res.json();
        console.log(json)
        if (json) {
            msg = '기존 비밀번호와 일치합니다!';
            flag = true;
        } else {
            msg = '기존 비밀번호와 일치하지 않습니다!';
            flag = false;
        }
        setUserPassword({...userPassword, password: pw});
        setMessage({...message, password: msg});
        setCorrect({...correct, password: flag});
    }

    const saveInputState = (flag, msg, inputVal, key) => {

        setCorrect({
            ...correct,
            [key]: flag
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setUserPassword({
            ...userPassword,
            [key]: inputVal
        });

    };
    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {

        const inputVal = e.target.value;
        // 검증 시작
        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        }  else {
            pwCheckFetch(inputVal);
            flag = true;
        }

        saveInputState(flag, msg, inputVal, 'newPassword');
    };
    //새로운 패스워드 입력값을 검증하고 관리할 함수
    const newPasswordHandler = e => {

        // 패스워드를 입력하면 확인란을 비우기
        document.getElementById('password-check').value = '';
        document.getElementById('check-text').textContent = '';

        setMessage({...message, reNewPassword: ''});
        setCorrect({...correct, reNewPassword: false});


        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        // 검증 시작
        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(inputVal)) {
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState(flag, msg, inputVal, 'newPassword');
    };

    // 패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {

        const inputValue = e.target.value;

        let msg, flag;
        if (!inputValue) { // 패스워드 안적은거
            msg = '비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userPassword.newPassword !== inputValue) {
            msg = '패스워드가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }

        saveInputState(flag, msg, inputValue, 'reNewPassword');
    };

    const okayClickHandler = () =>{
        // 모든 검증이 통과했는지 확인
        if (!correct.password || !correct.newPassword || !correct.reNewPassword) {
            // 만약 어떤 검증이라도 실패하면 경고창 표시
            alert('입력란을 다시 확인해주세요!');
            return;
        }
        alterFetch(document.getElementById('newPw').value);
        changePwStatus();
        alert('비밀번호가 변경되었습니다!');
    }

    const alterFetch= async (pw)=>{
        const payload = {
            id : userId,
            password : pw
        }

        const jsonBlob = new Blob(
            [JSON.stringify(payload)],
            {type:'application/json'});

        const formData = new FormData();
        formData.append('user',jsonBlob);
        const res = await fetch(API_URL,{
            method:"PUT",
            headers: {"Authorization" : `Bearer ${token}`},
            body: formData
        })

        if (res.status === 200) {
            const json = await res.json();
            console.log(json);
            localStorage.clear();

            const {token, userName, role, id} = json;
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('USER_NAME', userName);
            localStorage.setItem('ROLE', role);
            localStorage.setItem('USER_ID', id);
        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }

    return (
        <div className="my-alter-pw">
            <TextField
                className="standard-password-input"
                label="기존 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={passwordHandler}
            />
            <span className={'message'} style={
                correct.password
                    ? {color: '#61DBF0'}
                    : {color: '#F15F5F'}}>{message.password}</span>
            <TextField
                id="newPw"
                className="standard-password-input"
                label="새 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={newPasswordHandler}
            />
            <span className={'message'} style={
                correct.newPassword
                    ? {color: '#61DBF0'}
                    : {color: '#F15F5F'}}>{message.newPassword}</span>
            <TextField
                id = "password-check"
                className="standard-password-input"
                label="새 비밀번호 확인"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={pwCheckHandler}
            />
            <span id="check-text" className={'message'} style={
                correct.reNewPassword
                    ? {color: '#61DBF0'}
                    : {color: '#F15F5F'}}>{message.reNewPassword}</span>
            <div className="pw-alter-text">
                <div className="pw-text cancle-text" onClick={changePwStatus}>취소</div>
                <div className="pw-text okay-text" onClick={okayClickHandler}>완료</div>
            </div>
        </div>
    );
};

export default MyInfoAlterPw;