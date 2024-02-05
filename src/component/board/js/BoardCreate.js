import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link, useNavigate} from "react-router-dom";
import "../scss/BoardCreate.scss"
import BoardHeader from "./BoardHeader";
import {getCurrentLoginUser} from "../../../utils/login-util";
import {BOARD_URL} from "../../../config/host-config";


const BoardCreate = () => {
    const redirection = useNavigate();

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    // 서버에서 할 일 목록 (JSON)을 요청해서 받아와야 함
    const API_BASE_URL = BOARD_URL;

    const [boardList,setBoardList] = useState([]);

    const [boardTitle, setBoardTitle] = useState();
    const [explanation, setExplanation] = useState();



    const imgClickHandler = e => {
        document.getElementById('board_detail_img').click();
    };


    const [boardValue, setBoardValue] = useState({
        title: '',
        context:''
    });

    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setBoardValue({
            ...boardValue,
            [name]: value,
        });
    };


    // 보드 업로드
    const fetchBoardUpload = async () => {
        // JSON데이터를 formData에 넣기 위한 작업
        const jsonBlob = new Blob(
            [ JSON.stringify(boardValue) ],
            { type: 'application/json' }
        );


        const formData = new FormData();
        formData.append('boardInfo',jsonBlob);
        formData.append('fileUrl', document.getElementById('board_detail_img').files[0]);



        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        if (res.status === 200) {
            const json = await res.json();
            setBoardList(json.boardInfo);
            redirection('/board/main/FreeBoard')
        } else {
            alert("입력값이 유효하지 않습니다.")
            console.error('Error:',  res.status);
        }
    }

    const uploadHandler = e => {
        e.preventDefault();

        // 업로드를 허용하기 전에 사용자가 로그인되어 있는지 확인
        if (!token) {
            // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
            redirection('/template/login');
            return;
        }


        // 업로드 로직 진행
        fetchBoardUpload();
    }

    // useEffect를 사용하여 컴포넌트가 마운트될 때 사용자가 로그인되어 있는지 확인
    useEffect(() => {
        const userToken = getCurrentLoginUser().token;
        setToken(userToken);

        // 사용자가 로그인되어 있지 않으면 로그인 페이지로 리디렉션
        if (!userToken) {
            alert("로그인이 필요한 기능입니다!");
            redirection('/template/login');
        }
    }, []); // 빈 종속성 배열은 컴포넌트가 마운트될 때 이 효과가 한 번만 실행되도록 보장

    return (
        <>
        <BoardHeader/>
        <div className={'bc-wrapper'}>
            <div className={'bc-container'}>
                <div className={'bc-boardtitle'}>
                    <p>자유게시판</p>
                </div>
                <div className={'bc-create-title'}>
                    <input className={'bc-ct-input'} type="text" placeholder={'제목'}
                           name='title'
                           value={boardTitle}
                           onChange={onChange}
                    />
                </div>
                <div className={'bc-create-content'} >
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            const cleanData = data.replace(/<p>/g, '').replace(/<\/p>/g, '');
                            onChange({ target: { name: 'content', value: cleanData}});
                            console.log( { event, editor, cleanData } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <div className={'img-box'} onClick={imgClickHandler}>
                    <input
                        id='board_detail_img'
                        type='file'
                        accept='image/*'
                    />
                </div>
                <div className={'btn-container'}>
                    <div className={'bc-btns'}>
                        <div className={'cancel-btn'}>
                            <Link to="/board/main" className={'btn-b'}>취소</Link>
                        </div>
                        <div className={'save-btn'} onClick={uploadHandler}>
                            <p className={'btn'}>등록</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BoardCreate;