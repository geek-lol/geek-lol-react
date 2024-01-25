import React from 'react';
import {TextField} from "@mui/material";

const MyInfoAlterPw = ({cancle}) => {
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
                <div className="pw-text cancle-text" onClick={cancle}>취소</div>
                <div className="pw-text okay-text">완료</div>
            </div>
        </div>
    );
};

export default MyInfoAlterPw;