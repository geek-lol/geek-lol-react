import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../scss/Shorts_comment_list.scss'
import data from "bootstrap/js/src/dom/data";
import {BOARD_REPLY_URL, USER_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";

const ShortsCommentList = ({item, shortReplyList, ref}) => {


    const [showMore, setShowMore] = useState(false);
    const {replyId, writerId, writerName, context, replyDate, shortsId} = shortReplyList;

    const API_IMG_URL = USER_URL;
    const [writerImgUrl, setWriterImgUrl] = useState();



    // // 원본에 글자수 만큼 잘라서 짧은문장 만들기
    // const textLimit = useRef(65);
    //
    // const commenter = useMemo(() => {
    //     const shortReview = context.slice(0, textLimit.current);
    //
    //     if (context.length > textLimit.current) { 	// 원본이 길면 (원본 글자수 > 제한된 갯수)
    //         if (showMore) {
    //             return context;
    //         } 	// 더보기가 true 면 원본 바로 리턴
    //         return shortReview;			// (더보기가 false면) 짧은 버전 리턴해주자
    //     }
    //     return context; 			// 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
    // }, [showMore]);


    useEffect(() => {
        fetchWriterImg();
    },[])

    // 댓글쓴 사람의 이미지 URL
    const fetchWriterImg = async () => {

        const url = `${API_IMG_URL}/profile?userId=${writerId}`;
        const res = await fetch(url, {
            method: "GET"
        });

        if (res.status === 200) {
            const imgData = await res.blob();

            // blob이미지를 url로 변환
            const profileUrl = window.URL.createObjectURL(imgData);

            setWriterImgUrl(profileUrl);
            // console.log(profileUrl);

        } else {
            const errMsg = await res.text();
            alert(errMsg);
            setWriterImgUrl(null);
        }

    };

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



    return (
        shortReplyList && (
            <li key={shortReplyList.replyId} className={'comment-item'} id={'commentNo'}>
                <div className={'comment-user-profile'}>
                    <img src={writerImgUrl} alt="프로필이미지"/>
                </div>
                <div className={'comment-user-data'}>
                    <div className={'user-data'}>
                        <div className={'user-name'}>{writerName}</div>
                        <div className={'user-comment-date'}>{timeDifference}</div>
                    </div>
                    <div className={'user-comment'}>{context}

                        {/*<div className={'comment-show'} onClick={e => setShowMore(!showMore)}>*/}
                        {/*    {(comment.length > textLimit.current) &&*/}
                        {/*        (showMore ? '[닫기]' : '[더보기]')}*/}
                        {/*</div>*/}
                    </div>

                </div>
            </li>
        ));

};

export default ShortsCommentList;