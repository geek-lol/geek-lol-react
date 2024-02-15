import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from "classnames";
import {BsCaretLeftFill, BsPlusLg, BsSend} from "react-icons/bs";
import {BOARD_REPLY_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'
import axios from "axios";
import {brown} from "@mui/material/colors";

const ShortsComment = ({item, chkViewComment, viewComment, ReplyCount}) => {
    const {shortsId} = item;
    const API_BASE_URL = BOARD_REPLY_URL;
    const token = getCurrentLoginUser().token;

    const [shortReplyList, setShortReplyList] = useState([]); //replyList
    const [shortReplyCount, setShortReplyCount] = useState([]);
    const [replyValue, setReplyValue] = useState({context: ''});


    const onChange = (event) => {
        const {value, name} = event.target;
        setReplyValue({
            ...replyValue,
            [name]: value,
        });
    };

    const addReply = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/${shortsId}?page=${page}&size=${size}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(replyValue)
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const json = await res.json();
            setReplyValue({context: ''});
            setShortReplyList(json.reply);
            console.log(json.reply);
            setShortReplyCount(json.totalCount);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addReply();


    };

    useEffect(() => {
        ReplyCount(shortReplyCount);
    }, [replyValue]);

    // const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(12);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useState(null);

    const getItems = useCallback(async () => {
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/${shortsId}?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP 오류! 상태: ${res.status}`);
            }

            const json = await res.json();
            setShortReplyList(json.reply); // 가져온 댓글로 항목을 업데이트합니다.
            setShortReplyCount(json.totalCount);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
        // const fetchData = async () => {
        //     try {
        //         const res = await fetch(`${API_BASE_URL}/${shortsId}?page=1&size=15`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         if (res.status === 200) {
        //             const json = await res.json();
        //             console.log(json.reply);
        //             setShortReplyList(json.reply);
        //             setShortReplyCount(json.totalCount);
        //         } else if (!res.ok) {
        //             throw new Error(`HTTP error! Status: ${res.status}`);
        //         }
        //
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };
        // fetchData();
    }, [page]);

    useEffect(() => {
        getItems();
    }, [getItems])


    // useEffect(() => {
    //     if (size > shortReplyCount) {
    //         setSize(shortReplyCount);
    //     } else {
    //
    //         // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    //         if (inView) {
    //             setPage(shortReplyList => shortReplyList + 1)
    //         }
    //     }
    // }, [inView])


    return (
        <div className={'comment-container'}>
            <div className={'comment-top'}>
                <div className={'comment-title-box'}>
                    <span className={'comment-title'}>댓글</span>
                    <p className={'comment-count'}>{shortReplyCount}</p>
                </div>
                <BsPlusLg className={cn('comment-close-btn', {close_animation: viewComment})} onClick={chkViewComment}/>
            </div>
            <div className={'comment-box'}>
                <ul className={'comment-list scrollBar'}>
                    {shortReplyList.map((reply) => (
                        <Shorts_comment_list
                            ref={ref}
                            key={reply.shortsId}
                            shortReplyList={reply}
                            item={item}
                        />
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
