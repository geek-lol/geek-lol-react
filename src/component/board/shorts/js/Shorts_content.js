import React, {useEffect, useRef, useState} from 'react';
import '../scss/Shorts_content.scss'
import {BsChatLeft, BsExclamationCircle, BsHeart, BsHeartFill} from "react-icons/bs";
import cn from "classnames";
import Shorts_comment from "./Shorts_comment";
import {debounce, isEmpty} from "lodash";
import {SHORT_URL, SHORT_VOTE_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import axios from "axios";
import {json, useNavigate} from "react-router-dom";
import ReactPlayer from "react-player";

const ShortsContent = ({id, item, upVote}) => {
        const API_BASE_URL = SHORT_URL;
        const API_VOTE_URL = SHORT_VOTE_URL;
        const [token, setToken] = useState(getCurrentLoginUser().token);
        const requestHeader = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const redirect = useNavigate();
        const {shortsId, uploaderName, replyCount, viewCount, upCount, title, context} = item;


        const [viewComment, setViewComment] = useState(false);
        const [viewAni, setViewAni] = useState(false);

        // 휠 애니메이션
        const [currentIndex, setCurrentIndex] = useState(0);
        const [displayCount, setDisplayCount] = useState(1);


        const [viewScrollDownAni, setViewScrollDownAni] = useState(false);
        const [viewScrollUpAni, setViewScrollUpAni] = useState(false);
        // 휠 이벤트 시간
        const lastWheelTime = useRef(0);


        // 신고 모달 띄우기
        const [viewReport, setViewReport] = useState(false);
        const modalBackground = useRef();
        const contentRef = useRef(null);
        const isMounted = useRef(false);

        const [shortList, setShortList] = useState([]);
        // const [shortVote, setShortVote] = useState([]);


        //전체 upCount
        const [voteCount, setVoteCount] = useState(); // 각각의upCount
        const [voteShort, setVoteShort] = useState(false);
        const [voteLoaded, setVoteLoaded] = useState(false);

        const [totalCount, setTotalCount] = useState();


        // 이미지 URL을 저장할 상태변수
        const [videoUrl, setVideoUrl] = useState(null);
        const [videoLoaded, setVideoLoaded] = useState(false);

        // 이미지 URL
        const fetchShortVideo = async () => {

            const url = `${API_BASE_URL}/load-video/${shortsId}`;
            const res = await fetch(url, {
                method: "GET"
            });

            if (res.status === 200) {
                const videoData = await res.blob();

                // blob이미지를 url로 변환
                const shortUrl = window.URL.createObjectURL(videoData);

                setVideoUrl(shortUrl);
                console.log(shortUrl);

                setVideoLoaded(true);
            } else {
                const errMsg = await res.text();
                alert(errMsg);
                setVideoUrl(null);
            }

        };


        // 쇼츠 리스트
        const getshortList = async () => {
            fetch(API_BASE_URL, {
                method: 'GET',
                headers: requestHeader
            })
                .then(res => {
                    // console.log(res.status);
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(json => {
                    // console.log('shorts', json.shorts);
                    setShortList(json.shorts);
                    console.log(shortsId)
                    setTotalCount(upVote);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });


        };

        // 투표 리스트
        const getVoteList = async () => {

            fetch(`${API_VOTE_URL}?shortsId=${shortsId}`, {
                method: 'GET',
                headers: requestHeader
            })
                .then(res => {
                    // console.log(res.status);
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    // console.log('upCount', item.upCount);
                    return res.json();
                })
                .then(json => {
                    setVoteCount(json.up);
                    console.log('voteCount', json.up);

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });


        };


        // GET
        useEffect(() => {
            fetchShortVideo();
            getshortList();
            getVoteList();
            setVoteLoaded(true);

            console.log('shorts', shortsId);

        }, []);


        useEffect(() => {
            if (!videoLoaded) return;
        }, [videoLoaded]);


        useEffect(() => {
            if (!voteLoaded) return;
        }, [voteLoaded]);

        const voteShortVideo = (selectedShortsId) => {
            setVoteLoaded(true);
            // 로그인 여부 검사
            if (!token) {
                alert("로그인 회원만 할 수 있습니다.");
                redirect('/template/login');
                return;
            }

            // 투표 여부를 확인하는 함수
            const isAlreadyVoted = async () => {
                const res = await fetch(`${API_VOTE_URL}?shortsId=${shortsId}`, {
                    method: 'GET',
                    headers: requestHeader
                });

                if (res.status === 200) {
                    const json = await res.json();
                    setVoteCount(json.up);
                    return json.up
                } else {
                    console.error('Error:', res.status);
                    const err = await res.text();
                    alert(err);
                }
            };

            // 투표 여부에 따른 요청 분기
            const vote = async () => {
                const votedCount = await isAlreadyVoted();

                if (votedCount === 1 || votedCount === 0) {
                    const res = await fetch(API_VOTE_URL, {
                        method: 'PATCH',
                        headers: requestHeader,
                        body: JSON.stringify(shortsId)
                    })
                    if (res.status === 200) {
                        // 예상치 못한 끝이 발생하지 않도록 비동기 처리로 변경
                        const json = await res.json().catch(() => ({}));
                        console.log('jsonup', json.up);
                        setVoteCount(json.up);


                    } else {
                        console.error('Error:', res.status);
                    }
                    return;
                }

                // 새로운 투표
                const res = await fetch(API_VOTE_URL, {
                    method: 'POST',
                    headers: requestHeader,
                    body: JSON.stringify(shortsId)
                });
                if (res.status === 200) {
                    // 예상치 못한 끝이 발생하지 않도록 비동기 처리로 변경
                    const json = await res.json().catch(() => ({}));
                    console.log('jsonup', json.up);
                    setVoteCount(json.up);


                } else {
                    console.error('Error:', res.status);
                }
            };

            // 투표 실행
            vote();
        };


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

                if (deltaY > 0 && currentIndex < shortList.length - 1) {
                    setViewScrollDownAni(true);
                    setTimeout(() => {
                        setViewScrollDownAni(false);
                        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, shortList.length - 1)); // 범위 벗어나지 않도록
                    }, 300);
                } else if (deltaY < 0 && currentIndex > 0) {
                    setViewScrollUpAni(true);
                    setTimeout(() => {
                        setViewScrollUpAni(false);
                        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // 범위 벗어나지 않도록
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

                if (event.keyCode === 40 && currentIndex < shortList.length - 1) {
                    setViewScrollDownAni(true);
                    setTimeout(() => {
                        setViewScrollDownAni(false);
                        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, shortList.length - 1)); // 범위 벗어나지 않도록
                    }, 300);
                } else if (event.keyCode === 38 && currentIndex > 0) {
                    setViewScrollUpAni(true);
                    setTimeout(() => {
                        setViewScrollUpAni(false);
                        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // 범위 벗어나지 않도록
                    }, 300);
                }
                lastWheelTime.current = currentTime;
            }
        };

        useEffect(() => {
            // 전달받은 쇼츠의 인덱스로 초기화
            setCurrentIndex(shortList.findIndex((item) => item.shortsId === id));
            setCurrentIndex(Math.min(shortList.length - 1, 0));
            window.addEventListener('wheel', handleWheel);
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [shortList, id]);

        // const currentListItem = ;





        return (
            <div className={'container-html'}>
                <li key={shortsId}
                    className={cn('content-container', {scrollDown_ani_view: viewScrollDownAni}, {scrollUp_ani_view: viewScrollUpAni})}
                    ref={contentRef}>
                    {voteLoaded && (
                        <div className={cn('short-form', {animation_view: viewAni})} id={'root'}>
                            <div className={cn('content', {animation_content_view: viewComment})}>
                                {videoLoaded && (
                                    <video
                                        autoPlay={true}
                                        muted={true}
                                        controls={true}
                                        loop={true}
                                    >
                                        <source src={videoUrl}/>
                                    </video>
                                )}
                                <div className={'overlap-front'}>
                                    <div className={'produce'}>
                                        <div className={'profile_box'}>
                                            <div className={'profile-img'}>
                                                <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'}
                                                     alt="프로필이미지"/>
                                            </div>
                                            <div className={'profile-name'}>
                                                <p>{uploaderName}</p>
                                            </div>
                                        </div>
                                        <div className={'shortlist-title'}>
                                            <p className={'short-title'}>{title}</p>
                                        </div>
                                    </div>
                                    <div className={cn('front-sidebar', {front_sidebar_view: viewComment})}>
                                        <div className={'short-btn like-btn'}>
                                            {voteCount === 1 ? (
                                                <>
                                                    <BsHeartFill className={'btn'}
                                                                 onClick={() => voteShortVideo(item.shortsId)}/>
                                                </>
                                            ) : (
                                                <>
                                                    <BsHeart className={'btn'}
                                                             onClick={() => voteShortVideo(item.shortsId)}/>
                                                </>
                                            )}
                                            <p>{totalCount}</p>
                                        </div>
                                        <div className={'short-btn comment-btn'}>
                                            <BsChatLeft className={'btn'} onClick={chkViewComment}/>
                                            <p>{replyCount}</p>
                                        </div>
                                        <div className={'short-btn report-btn'}>
                                            <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cn('sidebar', {sidebar_view: viewComment})}>
                                <div className={'short-btn like-btn'}>
                                    {voteCount === 1 ? (
                                        <>
                                            <BsHeartFill className={'btn'}
                                                         onClick={() => voteShortVideo(item.shortsId)}/>
                                        </>
                                    ) : (
                                        <>
                                            <BsHeart className={'btn'}
                                                     onClick={() => voteShortVideo(item.shortsId)}/>
                                        </>
                                    )}
                                    <p>{totalCount}</p>
                                </div>
                                <div className={'short-btn comment-btn'}>
                                    <BsChatLeft className={'btn'} onClick={chkViewComment}/>
                                    <p>{replyCount}</p>
                                </div>
                                <div className={'short-btn report-btn'}>
                                    <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                                </div>
                            </div>
                            <div className={cn('comment-form', {comment_form_view: viewComment})}>
                                <div className={cn("comment", {comment_view: viewComment})}>
                                    <div className={'comment-wrapper'}>
                                        <Shorts_comment item={item} chkViewComment={chkViewComment}
                                                        viewComment={viewComment}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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

            </div>
        );


    }
;

export default ShortsContent;