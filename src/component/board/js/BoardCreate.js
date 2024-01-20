import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link} from "react-router-dom";
import "../scss/BoardCreate.scss"
import BoardHeader from "./Board_header";

const BoardCreate = () => {
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