import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../scss/Shorts_comment_list.scss'
import data from "bootstrap/js/src/dom/data";
import {BOARD_REPLY_URL} from "../../../../config/host-config";

const ShortsCommentList = ({item, shortReplyList, ref}) => {


    const [showMore, setShowMore] = useState(false);
    const {replyId, writerName, context, replyDate, shortsId} = shortReplyList;
    const [contextList, setContextList] = useState([]);



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





    return (
        shortReplyList && (
            <li key={shortReplyList.replyId} className={'comment-item'} id={'commentNo'}>
                <div className={'comment-user-profile'}>
                    <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                </div>
                <div className={'comment-user-data'}>
                    <div className={'user-data'}>
                        <div className={'user-name'}>{writerName}</div>
                        <div className={'user-comment-date'}>{replyDate}</div>
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