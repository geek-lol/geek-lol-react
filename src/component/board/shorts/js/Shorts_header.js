import React from 'react';
import {Link} from "react-router-dom";
import '../scss/Shorts_header.scss'
import cn from "classnames";

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
                        <div className={'board-menu-container'}>
                            <div className={'dropdown-board btn-b'}>미니게임
                                <div className={'board-menu-bar'}>
                                    <div className={'board-menuline'}></div>

                                    <Link to='/board/main' className={'menubar btn-b'}>응 미니게임~</Link>
                                    <Link to='/board/main' className={'menubar btn-b'}>2야</Link>
                                </div>
                            </div>
                        </div>
                        <div className={'board-menu-container'}>
                            <div className={'dropdown-board btn-b'}>게시판
                                <div className={'board-menu-bar'}>
                                    <div className={'board-menuline'}></div>

                                    <Link to='/board/main' className={'menubar btn-b'}>자유게시판</Link>
                                    <Link to='/board/main' className={'menubar btn-b'}>LCK게시판</Link>
                                    <Link to='/board/main' className={'menubar btn-b'}>공략게시판</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shorts_header;