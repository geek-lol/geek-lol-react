import React, {useEffect, useState} from 'react';
import BoardHeader from "../../../js/Board_header";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Link, useNavigate} from "react-router-dom";
import '../scss/ShortCreateMain.scss'
import {SHORT_URL} from "../../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../../utils/login-util";


const ShortCreateMain = () => {
    const redirection = useNavigate();

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // 서버에서 할 일 목록 (JSON)을 요청해서 받아와야 함
    const API_BASE_URL = SHORT_URL;

    // 이미지 파일을 상태변수로 관리
    const [thumbnailFile, setThumbnailFile] = useState(null);

    // 비디오 파일을 상태변수로 관리
    const [shortFile, setShortFile] = useState(null);

    // 썸네일 영역 클릭 이벤트
    const thumbnailClickHandler = e => {
        document.getElementById('thumbnail-img').click();
    };

    // 쇼츠 영역 클릭 이벤트
    const shortClickHandler = e => {
        document.getElementById('video').click();
    };




    const showThumbnailHandler = e => {

        // 첨부된 파일의 데이터를 가져오기
        const file = document.getElementById('thumbnail-img').files[0];
        // console.log(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setThumbnailFile(reader.result);
        };
    }

    const showVideoHandler = e => {

        // 첨부된 파일의 데이터를 가져오기
        const file = document.getElementById('video').files[0];
        // console.log(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setShortFile(reader.result);
        };
    }

    // 쇼츠 업로드
    const fetchShortUpload = e => {

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
        fetchShortUpload();
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
        <div className={'sc-wrapper'}>
            <div className={'sc-container'}>
                <div className={'sc-form'}>
                    <div className={'sc-board-title'}>
                        <p>Short 영상 업로드</p>
                    </div>
                    <div className={'sc-create-title'}>
                        <input className={'sc-ct-input'} type="text" maxLength={50} placeholder={'제목'}/>
                    </div>
                    <div className={'sc-create-content'}>
                        <div className={'sc-video-box'}>
                            <p>short</p>
                            <div className={'sc-video'} onClick={shortClickHandler}>
                                <video src={shortFile} />
                            </div>
                            <input
                                id={'video'}
                                type='file'
                                style={{display: 'none'}}
                                onChange={showVideoHandler}
                            />
                        </div>
                        <div className={'sc-produce-box'}>
                            <div className={'sc-thumbnail'}>
                                <p>썸네일</p>
                                <div className={'thumbnail-box'} onClick={thumbnailClickHandler}>

                                    <img
                                        src={thumbnailFile || process.env.PUBLIC_URL + '/assets/photo.png'} // 이미지 파일이 있으면 anonymous 사라짐
                                        alt="profile"
                                    />
                                </div>
                                <input
                                    id='thumbnail-img'
                                    type='file'
                                    style={{display: 'none'}}
                                    accept='image/*'
                                    onChange={showThumbnailHandler}
                                />
                            </div>

                            <div className={'sc-explanation'}>
                                <p>설명</p>
                                <textarea className={'explanation'} maxLength={100}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'btn-container'}>
                    <div className={'sc-buttons'}>
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
    );
};

export default ShortCreateMain;