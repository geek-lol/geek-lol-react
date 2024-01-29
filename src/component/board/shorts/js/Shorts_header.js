import React from 'react';
import {Link} from "react-router-dom";
import '../scss/Shorts_header.scss'
import cn from "classnames";
import {BsAward, BsBinoculars, BsClipboard2, BsFillHouseFill, BsHouse, BsNintendoSwitch} from "react-icons/bs";
import {ImUpload} from "react-icons/im";

const Shorts_header = () => {

    return (
        <div className={'header-container'}>
            <div className={'header-form'}>
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
                        <Link to='/' className={'btn-b'}><BsHouse className={'btn1'}/><p className={'btn2'}>홈</p></Link>
                        <Link to='/rank' className={'btn-b'}><BsAward className={'btn1'}/><p className={'btn2'}>랭킹</p>
                        </Link>
                        <Link to='/spector' className={'btn-b'}><BsBinoculars className={'btn1'}/>
                            <p className={'btn2'}>관전</p>
                        </Link>
                        <div className={'board-menu-container'}>
                            <div className={'dropdown-board btn-b'}>
                                <Link to='/board/main' className={'btn-b'}> <BsNintendoSwitch
                                    className={'btn1'}/></Link>
                                <p className={'btn2'}>미니게임</p>
                                <div className={'board-menu-bar'}>
                                    <div className={'board-menuline'}></div>
                                    <Link to='/board/main' className={'menubar btn-b'}>응 미니게임~</Link>
                                    <Link to='/board/main' className={'menubar btn-b'}>2야</Link>
                                </div>
                            </div>
                        </div>
                        <div className={'board-menu-container'}>
                            <div className={'dropdown-board btn-b'}>
                                <Link to='/board/main' className={'btn-b'}><BsClipboard2 className={'btn1'}/></Link>
                                <p className={'btn2'}>게시판</p>
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
            <div className={'shorts-save-btn'}>
                <Link to='/board/sc' className={'btn-b'}>
                    <ImUpload className={'btn1'}/>
                    <p className={'btn2'}>영상 업로드</p>
                </Link>
            </div>
        </div>
    );
};

export default Shorts_header;