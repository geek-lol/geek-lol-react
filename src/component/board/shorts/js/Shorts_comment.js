import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from "classnames";
import {BsCaretLeftFill, BsPlusLg, BsSend} from "react-icons/bs";
import {BOARD_REPLY_URL, USER_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'
import {redirect, useNavigate} from "react-router-dom";

const ShortsComment = ({item, chkViewComment, viewComment, ReplyCount}) => {
    const {shortsId, replyCount} = item;
    const API_BASE_URL = BOARD_REPLY_URL;
    const API_IMG_URL = USER_URL;

    const [imgUrl, setImgUrl] = useState();
    const token = getCurrentLoginUser().token;
    const redirection = useNavigate();

    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const defaultImageUrl = process.env.PUBLIC_URL + '/assets/defaultUser.jpg';

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
    const fetchUserImg = async () => {

        const url = `${API_IMG_URL}/load-profile`;
        const res = await fetch(url, {
            method: "GET",
            headers: requestHeader
        });

        if (res.status === 200) {
            const imgData = await res.blob();

            // blob이미지를 url로 변환
            const profileUrl = window.URL.createObjectURL(imgData);

            setImgUrl(profileUrl);
            // console.log(profileUrl);

        } else {

            console.log('로그인을 하지 않았습니다');
        }

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
            setShortReplyCount(json.reply.length);

            setPage(2);

            // Scroll to top
            containerRef.current.scrollTop = 0;

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!token) {
            alert('로그인후 이용해주세요.');
            redirection('/template/login');
        }
        addReply();
        fetchData();
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
                console.log(json.reply);
                setShortReplyCount(json.reply.length);
                // console.log(json.total);
                setShortReplyList(prevList => [...prevList, ...json.reply]);
                setPage(prevPage => prevPage + 1);

            } catch (error) {
                console.log('데이터 없음');
            }
            setIsLoading(false);
        }
    };





    useEffect(() => {
        if (!token){
            setImgUrl(defaultImageUrl);
        } else {
            fetchUserImg();
        }

        fetchData();
    }, []);


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleScroll = () => {
            if (
                containerRef.current &&
                containerRef.current.scrollTop + containerRef.current.clientHeight >=
                containerRef.current.scrollHeight
            ) {
                fetchData();
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
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
                    <img src={imgUrl} alt="프로필이미지"/>
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
