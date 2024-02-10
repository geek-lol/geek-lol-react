import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link, useNavigate, useParams} from "react-router-dom";
import "../scss/BoardCreate.scss"
import BoardHeader from "./BoardHeader";
import {getCurrentLoginUser} from "../../../utils/login-util";
import {BOARD_URL, DETAIL_URL, LOAD_PROFILE_URL, MODIFY_URL} from "../../../config/host-config";
import { useLocation } from 'react-router-dom';
import {value} from "lodash/seq";
import async from "async";


const Modify = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const redirection = useNavigate();

    const modifyFetch = async () => {
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
                alert('수정되었습니다.');
                redirection(`/board/detail/${data.bulletinId}`);


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
    const getImg=async ()=>{
        await fetch(`${LOAD_PROFILE_URL}?bulletinId=${data.bulletinId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.arrayBuffer(); // 바이너리 데이터로 변환된 응답 받기
            })
            .then(arrayBuffer => {
                // Blob 객체로 변환
                const blob = new Blob([arrayBuffer]);

                // Blob URL 생성
                const imageUrl = URL.createObjectURL(blob);

                // 이미지를 표시할 DOM 요소에 설정
                const imageElement = document.createElement('img');
                imageElement.className='imgTag';
                imageElement.src = imageUrl;
                // 이미지를 표시할 DOM 요소에 추가
                const contentCenter = document.querySelector('.img-box');
                contentCenter.insertBefore(imageElement, contentCenter.firstChild);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
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