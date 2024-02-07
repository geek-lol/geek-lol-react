import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link, useNavigate, useParams} from "react-router-dom";
import "../scss/BoardCreate.scss"
import BoardHeader from "./BoardHeader";
import {getCurrentLoginUser} from "../../../utils/login-util";
import {BOARD_URL, DETAIL_URL, MODIFY_URL} from "../../../config/host-config";
import { useLocation } from 'react-router-dom';
import {value} from "lodash/seq";
import async from "async";


const Modify = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const redirection = useNavigate();

    const modifyFetch = async () => {
        console.log(data);
        const formData = new FormData();
        formData.append('boardInfo', new Blob([JSON.stringify({ bulletinId: data.bulletinId, title: Title, content: modifyContent,posterId:data.posterId })], { type: 'application/json' }));
        formData.append('fileUrl', document.getElementById('board_detail_img').files[0]);

        try {
            const res = await fetch(MODIFY_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (res.status === 200) {
                const json = await res.json();
                console.log("res.status : 200 수정 완료");
                // redirection("/board/main/FreeBoard");

            } else {
                const errorMessage = await res.text();
                alert(`에러: ${errorMessage}`);
                console.error('Error:', res.status, errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [Title, setTitle] = useState(data.title);
    const [Content, setContent] = useState(data.content);
    const [modifyContent, setModifyContent] = useState();

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setModifyContent(value);
        console.log(modifyContent);
    };
    return (
        <>
        <BoardHeader/>
        <div className={'bc-wrapper'}>
            <div className={'bc-container'}>
                <div className={'bc-boardtitle'}>
                    <p>글 수정</p>
                </div>
                <div className={'bc-create-title'}>
                    <input className={'bc-ct-input'} type="text" placeholder={'제목'}
                           name='title'
                           value={Title}
                           onChange={onChangeTitle}
                    />
                </div>
                <div className={'bc-create-content'} >
                    <CKEditor
                        editor={ ClassicEditor }
                        data={Content}
                        onReady={ editor => {

                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            const cleanData = data.replace(/<p>/g, '').replace(/<\/p>/g, '');
                            onChange({ target: { name: 'content', value: cleanData}});
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <div className={'img-box'} >
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
                        <div className={'save-btn'} >
                            <p className={'btn'} onClick={modifyFetch}>수정</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Modify;