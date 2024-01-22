import React, {useState} from 'react';
import '../sass/MyInformation.scss';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MyInfoAlterPw from "./MyInfoAlterPw";

const MyInformation = () => {
    const [alterPw,setAlterPw] = useState(false);

    const alterPwClikHandler = ()=>{
        setAlterPw(!alterPw);
    }
    return (
        <div className="my-info-wrapper">
            <div className="info-title">기본정보</div>
            <div className="my-info-container">
                <TextField
                    id="outlined-read-only-input"
                    label="아이디"
                    defaultValue="sdofno@mba.com"
                    className="my-id-textField"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
            <div className="my-info-container">
                <div className="my-pw-title">비밀번호</div>
                {alterPw ? <MyInfoAlterPw cancle={alterPwClikHandler} />
                    : <div className="my-alter-main">
                    <div className="my-info-item">***********</div>
                    <div className="alter-text" onClick={alterPwClikHandler}>수정</div>
                    </div>
                }

            </div>
            <div className="my-info-container">
                <div className="my-pw-title">닉네임</div>
                <div className="my-alter-main">
                    <div className="my-info-item">레삐삐바위계집모가지캔딩이름이열세글자헐랭</div>
                    <div className="alter-text">수정</div>
                </div>
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