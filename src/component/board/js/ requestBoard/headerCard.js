import React from 'react';
import ReactPlayer from "react-player";

const HeaderCard = () => {
    return (
        <>
            <div className="prev hero">
                <div className='videoo'>
                    <ReactPlayer
                        url={"/assets/videos/lol.mp4"}
                        width={'300px'}
                        height={'100%'}/>
                </div>
                <div className="text"></div>
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/assets/lollogo.jpg'} alt=""/>
                </div>
                <div className="main-text">
                    <p>누가누가 문제인가요?? ㅅㅂ?</p>
                </div>
                <div className="main-text2">
                    <p>이전 투표 글</p>
                </div>
            </div>
        </>
    );
};

export default HeaderCard;