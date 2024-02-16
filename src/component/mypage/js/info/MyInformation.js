import React, {useEffect, useState} from 'react';
import '../../scss/MyInformation.scss';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import MyInfoAlterPw from "./MyInfoAlterPw";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import {useNavigate} from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MyInformation = ({userInfo,changeUser}) => {
    //리다이렉션 변수
    const redirection = useNavigate();
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterPw,setAlterPw] = useState(false);
    // 비밀번호 수정 버튼 클릭 확인 변수
    const [alterName,setAlterName] = useState(false);

    //입력 닉네임 저장
    const [newName,setNewName] = useState(userInfo.userName);
    const [newNameCheck,setNewNameCheck] = useState(false);
    const [message,setMessage] = useState("");

    const [user,setUser] = useState(userInfo);

    //요청 URL
    const API_URL = "http://localhost:8686/user";
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
        const res = await fetch(API_URL+"/modify",{
            method:"PUT",
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

    const changeAlterNameClikHandler = ()=>{
        setNewName(user.userName);
        setAlterName(false);
    }
    const alterNameClikHandler = ()=>{
        if (!newNameCheck){
            setAlterName(true);
        }else{
            alterNameFetch();
            setNewNameCheck(false);
            setAlterName(false);
        }
    }
    const inputNameHandler = (e) =>{
        const inputs = e.target.value
        if (inputs.length < 2 || inputs.length>6){
            setNewNameCheck(false);
            setMessage("닉네임은 2~6글자 사이여야 합니다.")
        } else{
            setNewNameCheck(true);
            setMessage("닉네임 사용가능 합니다!")
        }
        setNewName(inputs);
    }

    const deleteFetch = async () =>{
        const payload = {
            id : userId
        }
        const res = await fetch(API_URL+"/delete",{
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        })
        if (res.status === 200){
            localStorage.clear()
            redirection('/');
        }
    }

    //모달 관련

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteAndHandleClose = () => {
        setOpen(false);
        deleteFetch();
    };

    return (
        <div className="my-info-wrapper">
            <div className="info-title">기본정보</div>
            <div className="my-info-container">
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="아이디"
                    defaultValue={userInfo.userId}
                    sx={{mt:2}}
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
                <div className="my-pw-title">닉네임</div>
                <div className="my-alter-main">
                {!alterName
                    ? 
                        <>
                                <div className="my-info-item">{newName}</div>
                                <div className="alter-text" onClick={alterNameClikHandler}>수정</div>
                        </>
                    : 
                        <>
                                <TextField
                                className="my-info-item"
                                id="alterUserName"
                                value={newName}
                                variant="standard"
                                onChange={inputNameHandler}/>
                            <span className={'message'} style={
                                newNameCheck
                                    ? {color: '#61DBF0'}
                                    : {color: '#F15F5F'}}>{message}</span>
                                <div className="alter-text" onClick={changeAlterNameClikHandler}>취소</div>
                                <div className="alter-text" onClick={alterNameClikHandler}>완료</div>
                        </>
                }
                </div>
            </div>
            <div className="my-info-container user-delete">
                <Button variant="outlined" color="error" onClick={handleClickOpen}>
                    회원탈퇴
                </Button>
            </div>
            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"정말 탈퇴 하시겠습니까?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                           탈퇴하면 되돌릴 수 없습니다.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={deleteAndHandleClose}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default MyInformation;