import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {TROLL_RULING_BOARD_URL} from "../../../../config/host-config";
import {Link} from "react-router-dom";

const HeaderCard = ({item,isBool}) => {
    const {posterId,rulingId,title}=item||{};
    const [Video, setVideo] = useState();
    const playerRef = useRef(null);
    const [data,setData]=useState(null);
    useEffect(() => {
        getImg()
        rendering();
    }, []);

    const getImg = async () => {
        try {
            const response = await fetch(`${TROLL_RULING_BOARD_URL}/load-video/${rulingId}`, {
                method: 'POST'
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
    const rendering = async () => {
        await fetch(`${TROLL_RULING_BOARD_URL}/${rulingId}`, {
            method: 'GET'
        }).then(res => {
            if (res.status === 200)
                return res.json();
        }).then(json => {
            setData(json)
        })
    }


    return (
        <>
            <div className="prev hero">
                <div className='video'
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <ReactPlayer
                        ref={playerRef}
                        controls={false}
                        muted={true}
                        url={Video}
                        width={'300px'}
                        height={'169px'}/>
                </div>
                <div className="text"></div>
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/assets/lollogo.jpg'} alt=""/>
                </div>
                <div className="main-text">
                    <p>{title}</p>
                </div>
                <div className="main-text2">
                    {isBool ?
                        <Link to="/board/SelectDetail" state={{data:data,rulingId:rulingId}}><p>이전 투표글로</p></Link> :
                        <Link to="/board/SelectDetail" state={{data:data,rulingId:rulingId}}><p>현재 투표글로</p></Link>

                    }
                </div>
            </div>
        </>
    );
};

export default HeaderCard;