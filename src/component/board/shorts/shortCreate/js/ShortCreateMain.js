import React, {useState} from 'react';
import BoardHeader from "../../../js/Board_header";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Link} from "react-router-dom";
import '../scss/ShortCreateMain.scss'


const ShortCreateMain = () => {
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

    const fetchShortUpload = e => {

    }

    const uploadHandler = e => {
        e.preventDefault();

        fetchShortUpload();
    }

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