import React, {useState} from 'react';
import "../scss/Signup.scss";
import {USER_URL} from "../../../../config/host-config";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const API_BASE_URL = USER_URL;
    const SIGN_UP_URL = USER_URL + "/sign_up";
    const redirection = useNavigate(); // 리다이렉트 함수를 리턴

    // 검증이 모두 통과되면 계정 생성 버튼을 열어주는 논리 상태변수
    // const [lock, setLock] = useState(true);

    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userName: '',
        password: '',
        id: ''
    });

    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        passwordCheck: '',
        id: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        userName: false,
        password: false,
        passwordCheck: false,
        id: false
    });


    const saveInputState = (flag, msg, inputVal, key) => {

        setCorrect({
            ...correct,
            [key]: flag
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setUserValue({
            ...userValue,
            [key]: inputVal
        });

    };

    // 이메일 중복체크
    const fetchDuplicatedCheck = async (id) => {

        let msg = '', flag = false;

        const res = await fetch( API_BASE_URL + "/check?id=" + id);
        const json = await res.json();

        if (json) {
            msg = '이메일이 중복되었습니다!';
            flag = false;
        } else {
            msg = '사용 가능한 이메일입니다.';
            flag = true;
        }
        setUserValue({...userValue, id: id});
        setMessage({...message, id: msg});
        setCorrect({...correct, id: flag});
    };


    // 이메일 입력값을 검증하고 관리할 함수
    const emailHandler = e => {
        const inputVal = e.target.value;

        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        let msg, flag;
        if (!inputVal) {
            msg = '이메일은 필수값입니다!';
            flag = false;
        } else if (!emailRegex.test(inputVal)) {
            msg = '이메일 형식이 아닙니다!';
            flag = false;
        } else {
            // 이메일 중복체크
            fetchDuplicatedCheck(inputVal);
            return;
        }

        saveInputState(flag, msg, inputVal, 'id');
    };

    const nameHandler = e => {
        const inputVal = e.target.value;
        setUserValue({...userValue, userName: inputVal});
    }

    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {

        // 패스워드를 입력하면 확인란을 비우기
        document.getElementById('password-check').value = '';
        document.getElementById('check-text').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});


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

        saveInputState(flag, msg, inputVal, 'password');
    };

    // 패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {

        const inputValue = e.target.value;

        let msg, flag;
        if (!inputValue) { // 패스워드 안적은거
            msg = '비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userValue.password !== inputValue) {
            msg = '패스워드가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }

        saveInputState(flag, msg, inputValue, 'passwordCheck');
    };

    // 회원가입 비동기요청을 서버로 보내는 함수
    const fetchSignUpPost = async () => {
        console.log(userValue);

        const res = await fetch(SIGN_UP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userValue)
        });

        if (res.status === 200) {
            const json = await res.json();
            console.log(json);

            // 로그인 페이지로 리다이렉션
            redirection('/template/login');

        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }

    // 계정 생성 버튼을 누르면 동작할 내용
    const joinClickHandler = e => {
        e.preventDefault();

        // 모든 검증이 통과했는지 확인
        if (!correct.password || !correct.passwordCheck || !correct.id) {
            // 만약 어떤 검증이라도 실패하면 경고창 표시
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // 모든 검증이 통과했으면 회원가입 진행
        fetchSignUpPost();

    };

    return (
        <div className={'signup-container'}>
            <div className={'signup-textbox'}>
                <p> 이메일 회원가입</p>
            </div>
            <div className={'signup-input-box'}>
                <div className={'row'}>
                <p className={'input-textbox'}>이메일</p>
                    <span className={'message'} style={
                        correct.id
                            ? {color: '#61DBF0'}
                            : {color: '#F15F5F'}}>{message.id}</span>
                </div>
                <input className={'signup-input'}  name="id" id={'id'} type="text" onChange={emailHandler}/>
            </div>
            <div className={'signup-input-box'}>
                <p className={'input-textbox'}>닉네임</p>
                <input className={'signup-input'} type="text" onChange={nameHandler}/>
            </div>
            <div className={'signup-input-box'}>
                <div className={'row'}>
                <p className={'input-textbox'}>비밀번호</p>
                    <span className={'message'} style={
                        correct.password
                            ? {color: '#61DBF0'}
                            : {color: '#F15F5F'}}>{message.password}</span>
                </div>
                <input className={'signup-input'} type="password"
                       name="password"
                       id="password"
                       autoComplete="current-password"
                       onChange={passwordHandler}/>
            </div>
            <div className={'signup-input-box'}>
                <div className={'row'}>
                <p className={'input-textbox'}>비밀번호 확인</p>
                    <span id="check-text" className={'message'} style={
                        correct.passwordCheck
                            ? {color: '#61DBF0'}
                            : {color: '#F15F5F'}}>{message.passwordCheck}</span>
                </div>
                <input className={'signup-input'} type="password"
                       name="password-check"
                       id="password-check"
                       autoComplete="check-password"
                       onChange={pwCheckHandler}/>
            </div>
            <div className={'signup-button-box'} onClick={joinClickHandler}>
                <button className={'button-textbox'} type={"submit"}>회원가입</button>
            </div>
        </div>
    );
};

export default Signup;