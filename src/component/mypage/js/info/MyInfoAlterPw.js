import React from 'react';
import {TextField} from "@mui/material";
import {getCurrentLoginUser} from "../../../../utils/login-util";

const MyInfoAlterPw = ({changePwStatus,changeUser}) => {
    //요청 URL
    const API_URL = "http://localhost:8686/user/modify";
    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().userId;

    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const okayClickHandler = () =>{
        alterFetch(document.getElementById('newPw').value);
        changePwStatus();
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
            method:"POST",
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
            />
            <TextField
                id="newPw"
                className="standard-password-input"
                label="새 비밀번호"
                type="password"
                autoComplete="current-password"
                variant="standard"
            />
            <TextField
                className="standard-password-input"
                label="새 비밀번호 확인"
                type="password"
                autoComplete="current-password"
                variant="standard"
            />
            <div className="pw-alter-text">
                <div className="pw-text cancle-text" onClick={changePwStatus}>취소</div>
                <div className="pw-text okay-text" onClick={okayClickHandler}>완료</div>
            </div>
        </div>
    );
};

export default MyInfoAlterPw;