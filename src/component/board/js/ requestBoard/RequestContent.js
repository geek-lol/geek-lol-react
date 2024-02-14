import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import '../../scss/RequestContent.scss';
import {VscAccount} from "react-icons/vsc";
import {IoCalendarOutline, IoPerson} from "react-icons/io5";
import {BiSolidLike} from "react-icons/bi";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
import {Link} from "react-router-dom";
import {calculateTimeDifference} from "../../../../utils/time-util";
import {TROLL_APPLY_URL} from "../../../../config/host-config";
import {GoHeartFill} from "react-icons/go";
const RequestContent = ({item}) => {
    const playerRef = useRef(null);
    const {applyId,applyLink,content,localDateTime,posterId,posterName,reportCount,title,upCount,viewCount,replyCount}=item;
    const [timeDifference, setTimeDifference] = useState('');
    const getCurrentTime = () => new Date();
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

    const handleMouseEnter = () => {
        // 마우스가 들어왔을 때 동영상 재생 시작
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer();
            if (internalPlayer) {

                internalPlayer.play();
            }
        }
    };

    const handleMouseLeave = () => {
        // 마우스가 나갔을 때 동영상 일시 정지
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer();
            if (internalPlayer) {
                playerRef.current.seekTo(0, 'seconds');
                internalPlayer.pause();
            }
        }
    };
    useEffect(() => {
        getImg();
    }, []);
    const [video,setVideo]=useState(null);

    const getImg = async () => {
        try {
            const response = await fetch(`${TROLL_APPLY_URL}/load-video?applyId=${applyId}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer]);
            const videoUrl = URL.createObjectURL(blob);
            setVideo(videoUrl);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    }
    return (
        <>
            <Link className="Request-Content-Box" to={`/board/RequestDetail/${applyId}`}>
                <div className="content-box">
                    <div
                        className="video-box"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}

                    >
                        <div className="player">
                        <ReactPlayer
                            ref={playerRef}
                            url={video}
                            controls={false}
                            muted={true}
                            width='300px'
                            height={'170px'}

                        /></div>
                </div>

                    <div className="title-box">
                        <h1>{title}</h1>
                        <span>{content}</span>
                    </div>
                </div>
                <div className="info-Box">
                    <div className="info"><VscAccount /><span>{posterName}</span></div>
                    <div className="info"><GoHeartFill/><span>{upCount}</span></div>
                    <div className="info"><IoCalendarOutline /><span>{timeDifference}</span></div>
                    <div className="info"><BsChatDots /><span>{replyCount}</span></div>
                    <div className="info"><FaEye /><span>{viewCount}</span></div>
                </div>
            </Link>
        </>
    );
};

export default RequestContent;