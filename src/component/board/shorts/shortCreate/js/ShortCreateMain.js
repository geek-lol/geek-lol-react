import React from 'react';
import BoardHeader from "../../../js/Board_header";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Link} from "react-router-dom";
import '../scss/ShortCreateMain.scss'


const ShortCreateMain = () => {
    return (
        <div className={'sc-wrapper'}>
            <div className={'sc-container'}>
                <div className={'sc-form'}>
                    <div className={'sc-board-title'}>
                        <p>Short 영상 업로드</p>
                    </div>
                    <div className={'sc-create-title'}>
                        <input className={'sc-ct-input'} type="text" placeholder={'제목'}/>
                    </div>
                    <div className={'sc-create-content'}>
                        <div className={'sc-video'}>
                            <p>비디오</p>
                        </div>
                        <div className={'sc-produce-box'}>
                            <div className={'sc-thubnail'}>
                                <p>썸네일</p>
                                <input type="text"/>
                            </div>
                            <div className={'sc-explanation'}>
                                <p>설명</p>
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'btn-container'}>
                    <div className={'sc-btns'}>
                        <div className={'cancel-btn'}>
                            <Link to="/board/main" className={'btn-b'}>취소</Link>
                        </div>
                        <div className={'save-btn'}>
                            <p className={'btn'}>등록</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortCreateMain;