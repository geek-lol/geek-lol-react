import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link, useNavigate} from "react-router-dom";
import "../scss/BoardCreate.scss"
import {getCurrentLoginUser} from "../../../utils/login-util";
import {SHORT_URL} from "../../../config/host-config";
import BoardHeader from "./BoardHeader";

const BoardCreate = () => {
    const redirection = useNavigate();

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // 서버에서 할 일 목록 (JSON)을 요청해서 받아와야 함
    // const API_BASE_URL = SHORT_URL;

    // 보드 업로드
    const fetchBoardUpload = e => {

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
                    <input className={'bc-ct-input'} type="text" placeholder={'제목'}/>
                </div>
                <div className={'bc-create-content'}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <div className={'btn-container'}>
                    <div className={'bc-btns'}>
                        <div className={'cancel-btn'}>
                            <Link to="/board/main" className={'btn-b'}>취소</Link>
                        </div>
                        <div className={'save-btn'}>
                            <p className={'btn'} onClick={uploadHandler}>등록</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BoardCreate;