import React, {useEffect, useRef, useState} from 'react';
import '../scss/Shorts_content.scss'
import {BsChatLeft, BsExclamationCircle, BsHeart, BsHeartFill} from "react-icons/bs";
import cn from "classnames";
import Shorts_comment from "./Shorts_comment";
import {SHORT_URL, SHORT_VOTE_URL, USER_URL} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import {json, useNavigate} from "react-router-dom";
import ReactPlayer from "react-player";

const ShortsContent = ({id, item, upVote, anymore}) => {
    const API_BASE_URL = SHORT_URL;
    const API_VOTE_URL = SHORT_VOTE_URL;
    const API_IMG_URL = USER_URL;
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [userId, setUserId] = useState(getCurrentLoginUser().userId);
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const redirect = useNavigate();
    const {shortsId, uploaderName, replyCount, viewCount, upCount, title, context, uploaderId, uploadDate} = item;


    const [viewComment, setViewComment] = useState(false);
    const [viewAni, setViewAni] = useState(false);


    // 신고 모달 띄우기
    const [viewReport, setViewReport] = useState(false);
    const modalBackground = useRef();
    const contentRef = useRef(null);
    const isMounted = useRef(false);

    const [shortList, setShortList] = useState([]);
    // const [shortVote, setShortVote] = useState([]);


    //전체 upCount
    const [voteCount, setVoteCount] = useState(null); // 각각의upCount
    const [totalVote, setTotalVote] = useState();
    const [voteLoaded, setVoteLoaded] = useState(false);

    const [totalCount, setTotalCount] = useState(null);


    // 비디오 URL을 저장할 상태변수
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // 이미지 URL을 저장할 상태변수
    const [imgUrl, setImgUrl] = useState(null);

    // 비디오 URL
    const fetchShortVideo = async () => {

        const url = `${API_BASE_URL}/load-video/${shortsId}`;
        const res = await fetch(url, {
            method: "GET"
        });

        if (res.status === 200) {
            const shortUrl = await res.text();

            // blob이미지를 url로 변환

            setVideoUrl(shortUrl);
            // console.log(shortUrl);

            setVideoLoaded(true);
        } else {
            const errMsg = await res.text();
            alert(errMsg);
            setVideoUrl(null);
        }

    };

    // 이미지 URL
    const fetchUserImg = async () => {

        const url = `${API_IMG_URL}/profile/${uploaderId}`;
        const res = await fetch(url, {
            method: "GET"
        });

        if (res.status === 200) {
            const profileUrl = await res.text();

            // blob이미지를 url로 변환
            // const profileUrl = window.URL.createObjectURL(imgData);

            setImgUrl(profileUrl);
            // console.log(profileUrl);

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
                setReplyLength(replyCount);
                // setPage(prevPage => prevPage + 1);
                // console.log(shortsId)
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
                setTotalCount(json.total);
                // console.log('total', json.total)
                // console.log('voteCount', json.up);

            })
            .catch(error => {
                console.log('아직투표없음');
            });


    };


    // GET
    useEffect(() => {
        fetchShortVideo();
        fetchUserImg();
        getshortList();
        if (token) {
            getVoteList();
        }
        setVoteLoaded(true);
        setTotalCount(upCount);
    }, []);


    useEffect(() => {
        if (!videoLoaded) return;

    }, [videoLoaded]);


    useEffect(() => {
        if (!voteLoaded) return;
    }, [voteLoaded]);

    const voteShortVideo = () => {
        setVoteLoaded(true);
        // 로그인 여부 검사
        if (!token) {
            alert("로그인 회원만 할 수 있습니다.");
            redirect('/template/login');
            return;
        }


        // 투표 여부에 따른 요청 분기
        const vote = async () => {

            if (voteCount === 0 || voteCount === 1) {
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
                    setTotalCount(json.total);
                    console.log('total', json.total);


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
                setVoteCount(json.up);
                console.log('jsonup', json.up);
                setTotalCount(json.total);
                console.log('total', json.total);


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


    const [replyLength, setReplyLength] = useState(null);
    const ReplyCount = (replylength) => {
        // console.log(replylength)
        setReplyLength(replylength);
    }


    const videoRefs = useRef({});
    const [activeVideoId, setActiveVideoId] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.video-box video');
            elements.forEach((element) => {
                if (isElementInViewport(element)) {
                    setActiveVideoId(element.id);
                } else {
                    element.pause();
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };


    const removeshortlist = async () => {
        const res = await fetch(`${API_BASE_URL}/${shortsId}`, {
            method: 'DELETE',
            headers: requestHeader
        });
        if (res.status === 200) {
            // 예상치 못한 끝이 발생하지 않도록 비동기 처리로 변경
            const json = await res.json().catch(() => ({}));
            setShortList(shortList.filter(short => short.shortsId !== shortsId));
            getshortList();
        } else {
            console.error('Error:', res.status);
            getshortList();

        }
    };
    const formattedUploadDate = new Date(uploadDate).toLocaleDateString('ko-KR');

    return (
        <>
            <li key={shortsId}
                className={'content-container'}
                ref={contentRef}>
                {voteLoaded && (
                    <div className={cn('short-form', {animation_view: viewAni})} id={'root'}>
                        <div className={cn('content', {animation_content_view: viewComment})}>
                            {videoLoaded && (
                                <div className={'video-box'}>
                                    <video
                                        ref={(ref) => (videoRefs.current[shortsId] = ref)}
                                        src={videoUrl}
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        controls={true}
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    ></video>
                                </div>
                            )}
                            <div className={'overlap-front'}>
                                <div className={'produce'}>
                                    <div className={'profile_box'}>
                                        <div className={'profile-img'}>
                                            <img src={imgUrl}
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
                                        {voteCount === 0 ? (
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
                                        <p>{replyLength}</p>
                                    </div>
                                    <div className={'short-btn report-btn'}>
                                        <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cn('sidebar', {sidebar_view: viewComment})}>
                            <div className={'short-btn like-btn'}>
                                {voteCount === 0 ? (
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
                                <p>{replyLength}</p>
                            </div>
                            <div className={'short-btn report-btn'}>
                                <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                            </div>
                        </div>
                        <div className={cn('comment-form', {comment_form_view: viewComment})}>
                            <div className={cn("comment", {comment_view: viewComment})}>
                                <div className={'comment-wrapper'}>
                                    <Shorts_comment ReplyCount={ReplyCount} item={item} chkViewComment={chkViewComment}
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
                        <div className={'modal-inform'}>
                            <div className={'modal-box'}>
                                <p className={'p-text'}>업로드 날짜</p>
                                {new Date(uploadDate).toLocaleDateString('ko-KR')}
                            </div>
                            <div className={'modal-box'}>
                                <p className={'p-text'}>설명</p>
                                {context}
                            </div>
                            <div className={'modal-box'}>
                                <p className={'p-text'}>조회수</p>
                                {viewCount}회
                            </div>

                        </div>
                    </div>
                }
            </li>

        </>
    );


};

export default ShortsContent;