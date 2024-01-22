import React from 'react';
import '../sass/MyInformation.scss';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const MyInformation = () => {
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
                <div className="my-alter-main">
                    <div className="my-info-item">***********</div>
                    <div className="alter-text">수정</div>
                </div>
                <div className="my-alter-pw">
                    <TextField
                        className="standard-password-input"
                        label="기존 비밀번호"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                    <TextField
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
                </div>
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