import React from 'react';
import {Link} from "react-router-dom";
import '../scss/Shorts_header.scss'

const Shorts_header = () => {
    return (
        <div className={'shorts-header-wrapper'}>
            <div className={'header-container'}>
                <div className={'logo'}>
                    <a href="/">
                        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지"/>
                    </a>
                </div>
                <div className={'short-title'}>
                    <p>하이라이트</p>
                </div>
                <div className={'title-bottom-line'}></div>
                <div className={'header-navbar'}>
                    <div className={'menubar'}>
                        <Link to='/' className={'btn-b'}>홈</Link>
                        <Link to='/rank' className={'btn-b'}>랭킹</Link>
                        <Link to='/spector' className={'btn-b'}>관전</Link>
                        <Link to='/' className={'btn-b'}>미니게임</Link>
                        <Link to='/board/main' className={'btn-b'}>게시판</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shorts_header;