import React, {useRef} from 'react';
import ReactPlayer from "react-player";
import '../../scss/RequestContent.scss';
import {VscAccount} from "react-icons/vsc";
import {IoCalendarOutline, IoPerson} from "react-icons/io5";
import {BiSolidLike} from "react-icons/bi";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
const RequestContent = () => {
    const playerRef = useRef(null);

    const handleMouseEnter = () => {
        // 마우스가 들어왔을 때 동영상 재생 시작
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer();
            if (internalPlayer) {
                playerRef.current.seekTo(0, 'seconds');
                internalPlayer.play();
            }
        }
    };

    const handleMouseLeave = () => {
        // 마우스가 나갔을 때 동영상 일시 정지
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer();
            if (internalPlayer) {
                internalPlayer.pause();

            }
        }
    };
    return (
        <>
            <div className="Request-Content-Box">
                <div className="content-box">
                    <div
                        className="video-box"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ReactPlayer
                            ref={playerRef}
                            url={"/assets/videos/test2.mp4"}
                            width='300px'
                            height={'100%'}
                        />
                </div>

                    <div className="title-box">
                        <h1>이거 누구 잘못임?</h1>
                        <span>이거 누구 잘못임??이거 누구 잘못임??이거 누구 잘못임??이거 누구 잘못임??이거 누구 잘못임??이거 누구 잘못임??이거 누구 잘못임??</span>
                    </div>
                </div>
                <div className="info-Box">
                    <div className="info"><VscAccount /><span>작성자</span></div>
                    <div className="info"><BiSolidLike /><span>추천수</span></div>
                    <div className="info"><IoCalendarOutline /><span>3일전</span></div>
                    <div className="info"><BsChatDots /><span>5</span></div>
                    <div className="info"><FaEye /><span>15</span></div>
                </div>
            </div>
        </>
    );
};

export default RequestContent;