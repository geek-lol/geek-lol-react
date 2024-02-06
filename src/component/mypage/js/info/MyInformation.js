import React, {useState} from 'react';
import '../../scss/MyInformation.scss';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MyInfoAlterPw from "./MyInfoAlterPw";
import {getCurrentLoginUser} from "../../../../utils/login-util";

const MyInformation = ({userInfo}) => {
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterPw,setAlterPw] = useState(false);
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterName,setAlterName] = useState(false);
    const [user,setUser] = useState({
        id : userInfo.userId,
        password : null,
        userName : userInfo.userName,
    });


    const changePwStatus = ()=>{
        setAlterPw(!alterPw);
    }
    const chagePwUser = (pw) =>{
        setUser(prevUser => ({
            ...prevUser,
            password: pw
        }));
        console.log(user);
    }
    const alterPwClikHandler = ()=>{
        setAlterPw(!alterPw);
    }
    const alterNameClikHandler = ()=>{
        setAlterName(!alterName);
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
                {alterPw ? <MyInfoAlterPw cancle={alterPwClikHandler} chageUser={chagePwUser} changePwStatus={changePwStatus}/>
                    : <div className="my-alter-main">
                    <div className="my-info-item">***********</div>
                    <div className="alter-text" onClick={alterPwClikHandler}>수정</div>
                    </div>
                }
            </div>
            <div className="my-info-container">
                {!alterName
                    ? 
                        <>
                            <div className="my-pw-title">닉네임</div>
                            <div className="my-alter-main">
                                <div className="my-info-item">{userInfo.userName}</div>
                                <div className="alter-text" onClick={alterNameClikHandler}>수정</div>
                            </div>
                        </>
                    : 
                        <>
                            <div className="my-alter-main">  
                                <TextField
                                className="my-info-item"
                                id="standard-helperText"
                                label="닉네임"
                                defaultValue={userInfo.userName}
                                variant="standard"/>
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