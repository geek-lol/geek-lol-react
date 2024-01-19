import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link} from "react-router-dom";
import "../scss/BoardCreate.scss"

const BoardCreate = () => {
    return (
        <div className={'bc-wrapper'}>
            <div className={'bc-container'}>
                <div className={'bc-boardtitle'}>
                    <p>자유게시판</p>
                </div>
                <div className={'bc-create-title'}>
                    <input className={'bc-ct-input'} type="text"/>
                </div>
                <div className={'bc-create-content'}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
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
                            <Link to="/board/main" className={'btn'}>취소</Link>
                        </div>
                        <div className={'save-btn'}>
                            <a className={'btn'}>등록</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardCreate;