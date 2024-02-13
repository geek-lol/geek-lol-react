import React, { useEffect, useState } from 'react';
import cn from "classnames";
import { BsCaretLeftFill, BsPlusLg, BsSend } from "react-icons/bs";
import { BOARD_REPLY_URL } from "../../../../config/host-config";
import { getCurrentLoginUser } from "../../../../utils/login-util";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'

const ShortsComment = ({ item, chkViewComment, viewComment }) => {
    const { shortsId } = item;
    const API_BASE_URL = BOARD_REPLY_URL;
    const token = getCurrentLoginUser().token;

    const [shortReplyList, setShortReplyList] = useState([]);
    const [replyValue, setReplyValue] = useState({ context: '' });

    const onChange = (event) => {
        const { value, name } = event.target;
        setReplyValue({
            ...replyValue,
            [name]: value,
        });
    };

    const addReply = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/${shortsId}`, {
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
            setShortReplyList([...shortReplyList, json.reply]);
            setReplyValue({ context: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addReply();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/${shortsId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 200) {
                    const json = await res.json();
                    console.log(json.reply);
                    setShortReplyList(json.reply);
                } else if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={'comment-container'}>
            <div className={'comment-top'}>
                <div className={'comment-title-box'}>
                    <span className={'comment-title'}>댓글</span>
                    <p className={'comment-count'}>{shortReplyList.length}</p>
                </div>
                <BsPlusLg className={cn('comment-close-btn', { close_animation: viewComment })} onClick={chkViewComment} />
            </div>
            <div className={'comment-box'}>
                <ul className={'comment-list'}>
                    {shortReplyList.map((reply) => (
                        <Shorts_comment_list
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
