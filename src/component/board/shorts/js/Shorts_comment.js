import React, {useEffect, useState} from 'react';
import cn from "classnames";
import {dividerClasses} from "@mui/material";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'
import {BsCaretLeftFill, BsPlusLg, BsSend} from "react-icons/bs";
import data from "bootstrap/js/src/dom/data";
import * as commentLists from "react-bootstrap/ElementChildren";
import {BOARD_REPLY_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";

const ShortsComment = ({item, chkViewComment, viewComment}) => {

    const {shortsId, uploaderName,replyCount,viewCount, upCount, title, context, videoLink} = item;

    const API_BASE_URL = BOARD_REPLY_URL + `/${shortsId}`;

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };

    const [shortReply, setShortReply] = useState();

    const [shortReplyList, setShortReplyList] = useState([]);

    //
    // useEffect(() => {
    //
    //     fetch(API_BASE_URL, {
    //         method: 'GET',
    //         headers: { 'content-type': 'application/json' }
    //     })
    //         .then(res => {
    //             if (res.status === 200){
    //                 return res.json();
    //             }
    //         })
    //         .then(json => {
    //             if (json && json.reply) {
    //                 shortReplyList(json.reply);
    //             }
    //
    //         });
    //
    // }, []);

    const [replyValue, setReplyValue] = useState({
        context:''
    });

    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setReplyValue({
            ...replyValue,
            [name]: value,
        });
    };

    const addReply = () => {

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify(replyValue)
        })
            .then(res => {
                if (res.status===200) return res.json();


            })
            .then(json => {
                json && setShortReplyList(json.reply);
            });

    }

    const submitHandler = e => {
        e.preventDefault(); {/* 보냈을때 페이지가 다시로딩되는걸 막음 */}
        addReply();
        // 폼이 제출되면 입력창 비우기
        setShortReply('');
    }


    return (
        <div className={'comment-container'}>
            <div className={'comment-top'}>
                <div className={'comment-title-box'}>
                    <span className={'comment-title'}>댓글</span>
                    <p className={'comment-count'}>{replyCount}</p>
                </div>
                <BsPlusLg className={cn('comment-close-btn', {close_animation: viewComment})} onClick={chkViewComment}
                    />
            </div>
            <div className={'comment-box'}>
                <ul className={'comment-list'}>
                        <Shorts_comment_list shortReplyList={shortReplyList} />
                </ul>
            </div>
            <div className={'comment-save'}>
                <div className={'comment-save-profile'}>
                    <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                </div>
                <div className={'comment-input-box'}>
                    <input type="text" placeholder={'댓글추가...'} name='context' value={shortReply} onChange={onChange}/>
                    <BsSend className={'comment-send'} onClick={submitHandler}/>
                </div>
            </div>
        </div>
    );
};

export default ShortsComment;