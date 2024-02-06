import React, {useEffect, useState} from 'react';
import '../../scss/MyInformation.scss';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MyInfoAlterPw from "./MyInfoAlterPw";
import {getCurrentLoginUser} from "../../../../utils/login-util";

const MyInformation = ({userInfo,changeUser}) => {
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterPw,setAlterPw] = useState(false);
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterName,setAlterName] = useState(false);

    //입력 닉네임 저장
    const [newName,setNewName] = useState(userInfo.userName);

    const [user,setUser] = useState(userInfo);
    /*
    joinMembershipDate:"",
        profileImage:null,
        userId: "",
        userName:""
    * */
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

    const alterNameFetch = async () =>{
        const newUser = {
            id : userId,
            userName : newName
        }

        const jsonBlob = new Blob(
            [JSON.stringify(newUser)],
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
            localStorage.clear();

            const {token, userName, role, id} = json;
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('USER_NAME', userName);
            localStorage.setItem('ROLE', role);
            localStorage.setItem('USER_ID', id);

            changeUser(user);
        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }

    const changePwStatus = ()=>{
        setAlterPw(!alterPw);
    }
    const chagePwUser = (pw) =>{
        setUser(prevUser => ({
            ...prevUser,
            password: pw
        }));
    }

    useEffect(() => {
        setUser(prev=>(
            {
                ...prev,
                userName: newName
            }))
    }, [newName]);
    const alterNameClikHandler = ()=>{

        alterName && alterNameFetch();
        setAlterName(!alterName);

    }
    const inputNameHandler = (e) =>{
        setNewName(e.target.value);

    }
    return (
        <div className="my-info-wrapper">
            <div className="info-title">기본정보</div>
            <div className="my-info-container">
                <TextField
                    id="outlined-read-only-input"
                    label="아이디"
                    defaultValue={userInfo.userId}
                    className="my-id-textField"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
            <div className="my-info-container">
                <div className="my-pw-title">비밀번호</div>
                {alterPw ? <MyInfoAlterPw changePwStatus={changePwStatus}
                                          changeUser={changeUser}/>
                    : <div className="my-alter-main">
                    <div className="my-info-item">***********</div>
                    <div className="alter-text" onClick={changePwStatus}>수정</div>
                    </div>
                }
            </div>
            <div className="my-info-container">
                {!alterName
                    ? 
                        <>
                            <div className="my-pw-title">닉네임</div>
                            <div className="my-alter-main">
                                <div className="my-info-item">{newName}</div>
                                <div className="alter-text" onClick={alterNameClikHandler}>수정</div>
                            </div>
                        </>
                    : 
                        <>
                            <div className="my-alter-main">  
                                <TextField
                                className="my-info-item"
                                id="alterUserName"
                                label="닉네임"
                                value={newName}
                                variant="standard"
                                onChange={inputNameHandler}/>
                                <div className="alter-text" onClick={alterNameClikHandler}>완료</div>
                            </div>
                          
                        </>
                }


            </div>
            <div className="my-info-container user-delete">
                <Button variant="outlined" color="error">
                    회원탈퇴
                </Button>
            </div>
        </div>
    );
};

export default MyInformation;