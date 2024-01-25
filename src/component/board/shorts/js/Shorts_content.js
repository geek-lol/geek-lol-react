import React, {useEffect, useRef, useState} from 'react';
import {BiBlock, BiHeart, BiMessage} from "react-icons/bi";
import '../scss/Shorts_content.scss'
import Shorts_header from "./Shorts_header";
import {BsChatLeft, BsExclamationCircle, BsHeart} from "react-icons/bs";
import cn from "classnames";
import Shorts_comment from "./Shorts_comment";
import Team1ItemDetail from "../../../spector/js/Team1ItemDetail";
import BanPick from "../../../spector/js/BanPick";
import Team2ItemDetail from "../../../spector/js/Team2ItemDetail";

const ShortsContent = () => {
    const [viewComment, setViewComment] = useState(false);
    const [viewAni, setViewAni] = useState(false);
    const [shortsList, setShortsList] = useState(['어쩔띠', '캬캬캬캬', '집집 I wnat go home']);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [viewScrollDownAni, setViewScrollDownAni] = useState(false);
    const [viewScrollUpAni, setViewScrollUpAni] = useState(false);




    // 신고 모달 띄우기
    const [viewReport, setViewReport] = useState(false);
    const modalBackground = useRef();

    const contentRef = useRef(null);
    const isMounted = useRef(false);

    // 댓글 닫을때 애니메이션
    useEffect(() => {
        if (isMounted.current === true) {
            setViewAni(!viewComment);

        } else if (isMounted.current === false) {
            setViewAni(false);
            isMounted.current = true;
        }
    }, [viewComment]);


    // 댓글버튼 클릭 핸들러
    const chkViewComment = e => {
        setViewComment(!viewComment);

    }


    const handleWheel = (event) => {
        const deltaY = event.deltaY;

        if (deltaY > 0 && currentItemIndex < shortsList.length - 1) { // 마우스 휠을 내릴때
            setViewScrollDownAni(true);
            setViewScrollUpAni(false);
            setCurrentItemIndex((prevIndex) => prevIndex + 1);
        } else if (deltaY < 0 && currentItemIndex > 0) { // 마우스 휠을 올릴때
            setViewScrollDownAni(false);
            setViewScrollUpAni(true);

            setCurrentItemIndex((prevIndex) => prevIndex - 1);
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentItemIndex]);

    useEffect(() => {
        if (isMounted.current) {
            setViewAni(true);
        } else {
            isMounted.current = true;
        }
    }, [currentItemIndex]);



    return (
        <>
            {shortsList.slice(currentItemIndex, currentItemIndex + 1).map((title, index) => (
                <li key={index} className={cn('content-container', {scrollDown_ani_view: viewScrollDownAni},{scrollUp_ani_view: viewScrollUpAni})} ref={contentRef}>
                    <div className={cn('short-form', {animation_view: viewAni})}>
                        <div className={cn('content', {animation_content_view: viewComment})}>
                            <video src="#" className={'short-video'}></video>
                            <div className={'overlap-front'}>
                                <div className={'produce'}>
                                    <div className={'profile_box'}>
                                        <div className={'profile-img'}>
                                            <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                                        </div>
                                        <div className={'profile-name'}>
                                            <p>우와앙아</p>
                                        </div>
                                    </div>
                                    <div className={'short-title'}>
                                        <p>{title}</p>
                                    </div>
                                </div>
                                <div className={cn('front-sidebar', {front_sidebar_view: viewComment})}>
                                    <div className={'short-btn like-btn'}>
                                        <BsHeart className={'btn'}/>
                                        {/* <BsHeartFill /> */}
                                        <p>1300</p>
                                    </div>
                                    <div className={'short-btn comment-btn'}>
                                        <BsChatLeft className={'btn'} onClick={chkViewComment}/>
                                        <p>2</p>
                                    </div>
                                    <div className={'short-btn report-btn'}>
                                        <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cn('sidebar', {sidebar_view: viewComment})}>
                            <div className={'short-btn like-btn'}>
                                <BsHeart className={'btn'}/>
                                {/* <BsHeartFill /> */}
                                <p>1300</p>
                            </div>
                            <div className={'short-btn comment-btn'}>
                                <BsChatLeft className={'btn'} onClick={chkViewComment}/>
                                <p>2</p>
                            </div>
                            <div className={'short-btn report-btn'}>
                                <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                            </div>
                        </div>
                        <div className={cn('comment-form', {comment_form_view: viewComment})}>
                            <div className={cn("comment", {comment_view: viewComment})}>
                                <div className={'comment-wrapper'}>
                                    <Shorts_comment chkViewComment={chkViewComment} viewComment={viewComment}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        viewReport &&
                        <div className={'modal-container'} ref={modalBackground} onClick={e => {
                            if (e.target === modalBackground.current) {
                                setViewReport(false);
                            }
                        }}>
                            <div className={'modal-report'}>
                                <div className={'modal-report-text'}>
                                    <p>정말 신고하시겠습니까?</p>
                                </div>
                                <div className={'modal-btns'}>
                                    <div className={'modal-cancel-btn'} onClick={() => setViewReport(false)}>
                                        <p>취소</p>
                                    </div>
                                    <div className={'modal-correct-btn'}>
                                        <p>확인</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </li>
            ))}
        </>
    );


};

export default ShortsContent;