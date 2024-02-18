import React, {useEffect, useState} from 'react';
import {getCurrentLoginUser} from "../../utils/login-util";
import {AiFillAlert} from "react-icons/ai";
import {REPLY_URL} from "../../config/host-config";

const BoardReply = ({item,getReplyCount,wordfc,Replyrendering}) => {
    const {replyId, context, replyDate, writerId,writerName} = item;
    //토큰
    const [token, setToken] = useState(getCurrentLoginUser().token);

    const [username, setUsername] = useState(getCurrentLoginUser().userId);
    const [timeDifference, setTimeDifference] = useState('');


    // 현재 시간을 가져오는 함수
    const getCurrentTime = () => new Date();

    // 두 날짜 사이의 차이를 계산하는 함수
    const calculateTimeDifference = (startDateTime, endDateTime) => {
        const timeDifference = Math.abs(endDateTime - startDateTime);
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);

        if (daysDifference > 0) {
            return `${daysDifference}일 전`;
        } else if (hoursDifference > 0) {
            return `${hoursDifference}시간 전`;
        } else if (minutesDifference > 0) {
            return `${minutesDifference}분 전`;
        } else {
            return `${secondsDifference}초 전`;
        }
    };

    // 컴포넌트가 마운트될 때와 localDateTime이 변경될 때마다 실행
    useEffect(() => {
        // 현재 시간과 댓글 작성 시간 사이의 차이 계산
        const timeDiff = calculateTimeDifference(new Date(replyDate), getCurrentTime());
        setTimeDifference(timeDiff);

        // 1분마다 갱신하도록 설정 (옵션)
        const intervalId = setInterval(() => {
            const timeDiff = calculateTimeDifference(new Date(replyDate), getCurrentTime());
            setTimeDifference(timeDiff);
        }, 10000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수 방지
        return () => clearInterval(intervalId);
    }, [replyDate]);  // localDateTime이 변경될 때마다 useEffect 실행
    const deleteReply = async () => {
        try {
            const response = await fetch(`${REPLY_URL}/${replyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then(res=>{
                if(res.status===200){
                    wordfc("ASdf");
                    Replyrendering();
                    return res.json();
                }
            }).then(json=>{

                console.log(json);
            })


        } catch (error) {
        }
    };
    const useConfirm = (message = null, onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            return;
        }

        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancel();
            }
        };

        return confirmAction;
    };
    const deleteConfirm = () => {
        deleteReply();
        Replyrendering();
        getReplyCount();
        console.log("삭제했습니다.");
    };
    const cancelConfirm = () => console.log("취소했습니다.");
    const confirmDelete = useConfirm(
        "삭제하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );


    const deleteHandler = () => {
        confirmDelete();
    };
    return (
        <>
            <div className="comment">
                <div className="comment-top">
                    <div className="tqbox">
                        <p>{writerName}</p><p>|</p>
                        <p>{timeDifference}</p>
                    </div>
                    {username === writerId ?
                        <p style={{paddingRight: '20px', color: 'red'}} onClick={deleteHandler}>삭제</p>
                        :
                        <p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>
                    }
                </div>
                <div className="comment-content">
                    <span className="ctt">{context}</span>
                </div>
            </div>
        </>
    );
};

export default BoardReply;