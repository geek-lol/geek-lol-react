import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function BoardContent({item}) {
    const {bulletinId,posterId,title,viewCount,localDateTime,upCount}=item;
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
        const timeDiff = calculateTimeDifference(new Date(localDateTime), getCurrentTime());
        setTimeDifference(timeDiff);

        // 1분마다 갱신하도록 설정 (옵션)
        const intervalId = setInterval(() => {
            const timeDiff = calculateTimeDifference(new Date(localDateTime), getCurrentTime());
            setTimeDifference(timeDiff);
        }, 10000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수 방지
        return () => clearInterval(intervalId);
    }, [localDateTime]);  // localDateTime이 변경될 때마다 useEffect 실행
    return (
        <>
            <Link className="table-content btn-b" to={`/board/detail/${bulletinId}`} >
                <div className="num">{bulletinId}</div>
                <div className="empty"></div>
                <div className="contents">
                    <span>{title}</span>
                    <i>[0]</i>
                </div>
                <div className="board_nickname">{posterId}</div>
                <div className="num">{timeDifference}</div>
                <div className="num">{viewCount}</div>
                <div className="num">{upCount}</div>
            </Link>
        </>
    );
}

export default BoardContent;