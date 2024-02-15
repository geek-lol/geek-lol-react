import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from "classnames";
import {BsCaretLeftFill, BsPlusLg, BsSend} from "react-icons/bs";
import {BOARD_REPLY_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'

const ShortsComment = ({item, chkViewComment, viewComment, ReplyCount}) => {
    const {shortsId, replyCount} = item;
    const API_BASE_URL = BOARD_REPLY_URL;
    const token = getCurrentLoginUser().token;
    const containerRef = useRef(null);

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
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
            const res = await fetch(`${API_BASE_URL}/${shortsId}?page=1&size=15`, {
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
            // console.log(json.reply);
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


    const fetchData = async () => {
        if (replyCount !== 0) {
            try {
                const res = await fetch(`${API_BASE_URL}/${shortsId}?page=${page}&size=15`, {
                    method: 'GET'
                });

                if (!res.ok) {
                    throw new Error(`HTTP 오류! 상태: ${res.status}`);
                }

                const json = await res.json();
                setShortReplyList(prevList => [...prevList, ...json.reply]);
                setPage(prevPage => prevPage + 1);

            } catch (error) {
                console.log('데이터 없음');
            }
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (
                containerRef.current &&
                containerRef.current.scrollTop + containerRef.current.clientHeight >=
                containerRef.current.scrollHeight
            ) {
                fetchData();
            }
        };

        containerRef.current.addEventListener('scroll', handleScroll);
        return () => {
            containerRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [fetchData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={'comment-container'}>
            <div className={'comment-top'}>
                <div className={'comment-title-box'}>
                    <span className={'comment-title'}>댓글</span>
                    <p className={'comment-count'}>{shortReplyCount}</p>
                </div>
                <BsPlusLg className={cn('comment-close-btn', {close_animation: viewComment})} onClick={chkViewComment}/>
            </div>
            <div ref={containerRef} className={'comment-box'}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className={'comment-list scrollBar'}>
                        {shortReplyList && shortReplyList.map((reply) => (
                            <Shorts_comment_list
                                key={reply.id}
                                shortReplyList={reply}
                                item={item}
                            />
                        ))}
                    </ul>
                )}
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
