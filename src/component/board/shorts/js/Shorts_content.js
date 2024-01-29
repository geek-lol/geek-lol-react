import React, {useEffect, useRef, useState} from 'react';
import '../scss/Shorts_content.scss'
import {BsChatLeft, BsExclamationCircle, BsHeart} from "react-icons/bs";
import cn from "classnames";
import Shorts_comment from "./Shorts_comment";
import {debounce} from "lodash";

const ShortsContent = () => {
    const [viewComment, setViewComment] = useState(false);
    const [viewAni, setViewAni] = useState(false);

    // 글자수 제한 70이 좋은듯
    const [shortsList, setShortsList] = useState([
        '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하'
        , '캬캬캬캬', '집집 I wnat go home']);
    // 휠 애니메이션
    const [viewScrollDownAni, setViewScrollDownAni] = useState(false);
    const [viewScrollUpAni, setViewScrollUpAni] = useState(false);
    // 리스트 인덱스
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    // 휠 이벤트 시간
    const lastWheelTime = useRef(0);


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


    // 휠을 내리거나 올렸을때 0.3s 기다리고 움직임
    const handleWheel = (event) => {
        const currentTime = new Date().getTime();
        // 이전 이벤트 시간 - 지금 이벤트 시간
        const deltaTime = currentTime - lastWheelTime.current;

        // 만약 0.4s이상이면 실행되도록
        if (deltaTime > 400) {
            const deltaY = event.deltaY;

            if (deltaY > 0 && currentItemIndex < shortsList.length - 1) {
                setViewScrollDownAni(true);
                setTimeout(() => {
                    setViewScrollDownAni(false);
                    setCurrentItemIndex((prevIndex) => prevIndex + 1);
                }, 300);
            } else if (deltaY < 0 && currentItemIndex > 0) {
                setViewScrollUpAni(true);
                setTimeout(() => {
                    setViewScrollUpAni(false);
                    setCurrentItemIndex((prevIndex) => prevIndex - 1);
                }, 300);
            }

            lastWheelTime.current = currentTime;
        }
    };

    const handleKeyDown = (event) => {
        const currentTime = new Date().getTime();
        // 이전 이벤트 시간 - 지금 이벤트 시간
        const deltaTime = currentTime - lastWheelTime.current;

        // 만약 0.4s이상이면 실행되도록
        if (deltaTime > 400) {
            const deltaY = event.deltaY;

            if (event.keyCode === 40 && currentItemIndex < shortsList.length - 1) {
                setViewScrollDownAni(true);
                setTimeout(() => {
                    setViewScrollDownAni(false);
                    setCurrentItemIndex((prevIndex) => prevIndex + 1);
                }, 300);
            } else if (event.keyCode === 38 && currentItemIndex > 0) {
                setViewScrollUpAni(true);
                setTimeout(() => {
                    setViewScrollUpAni(false);
                    setCurrentItemIndex((prevIndex) => prevIndex - 1);
                }, 300);
            }
            lastWheelTime.current = currentTime;
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('keydown', handleKeyDown); // 키다운 이벤트 추가
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown); // 이벤트 제거
        };
    }, [currentItemIndex]);


    return (
        <>
            {shortsList.slice(currentItemIndex, currentItemIndex + 1).map((title, index) => (
                <li key={index}
                    className={cn('content-container', {scrollDown_ani_view: viewScrollDownAni}, {scrollUp_ani_view: viewScrollUpAni})}
                    ref={contentRef}>
                    <div className={cn('short-form', {animation_view: viewAni})}>
                        <div className={cn('content', {animation_content_view: viewComment})}>
                            <video src="#" className={'short-video'}></video>
                            <div className={'overlap-front'}>
                                <div className={'produce'}>
                                    <div className={'profile_box'}>
                                        <div className={'profile-img'}>
                                            <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'}
                                                 alt="프로필이미지"/>
                                        </div>
                                        <div className={'profile-name'}>
                                            <p>우와앙아</p>
                                        </div>
                                    </div>
                                    <div className={'shortlist-title'}>
                                        <p className={'short-title'}>{title}</p>
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