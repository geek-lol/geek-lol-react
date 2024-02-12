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
import Shorts_content from "./Shorts_content";
import async from "async";

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

    const addReply = async () => {


        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify(replyValue)
        })

        if (res.status === 200) {
            // 예상치 못한 끝이 발생하지 않도록 비동기 처리로 변경
            const json = await res.json().catch(() => ({}));
            setShortReplyList(json.reply, () => setReplyValue({ context: '' }));



        } else {
            console.error('Error:',  res.status);
        }

    }






    const submitHandler = e => {
        e.preventDefault(); {/* 보냈을때 페이지가 다시로딩되는걸 막음 */}
        addReply();
        // 폼이 제출되면 입력창 비우기

        setReplyValue({ context: '' });
    }

    useEffect(() => {

        fetch(API_BASE_URL, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                if (json && json.reply) {
                    // console.log(json.reply);
                    setShortReplyList(json.reply);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);


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
                    {shortReplyList.map((reply) => (
                        <Shorts_comment_list
                            key={reply.replyId}
                            shortReplyList={reply}
                            item={item}/>
                    ))}

                </ul>
            </div>
            <div className={'comment-save'}>
                <div className={'comment-save-profile'}>
                    <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                </div>
                <div className={'comment-input-box'}>
                    <input
                        type="text"
                        placeholder={'댓글추가...'}
                        name="context"
                        value={replyValue.context}
                        onChange={onChange}
                        maxLength="88"
                    />
                    <BsSend className={'comment-send'} onClick={submitHandler}/>
                </div>
            </div>
        </div>
    );
};

export default ShortsComment;