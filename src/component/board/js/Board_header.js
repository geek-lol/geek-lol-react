import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/Board_header.scss';
import cn from "classnames";
import {Link} from "react-router-dom";
function BoardHeader(props) {


    //게시판 로드시 헤더 표시 
    useEffect(() => {
        if (window.location.href.includes("main")) {
            setClick("c1");
        }
        // if (window.location.href.includes("main")) {
        //     setClick("c1");
        // }
        // if (window.location.href.includes("main")) {
        //     setClick("c1");
        // }
    }, []);
    const [click,setClick]=useState("");
    const headerClickHandler = (e) => {
        const classToClickMap = {
            "c1": "c1",
            "c2": "c2",
            "c3": "c3",
            "c4": "c4",
        };
        for (const className in classToClickMap) {
            if (e.target.className.includes(className)) {
                setClick(classToClickMap[className]);
                break;
            }
        }
    };
    return (
        <>
            <div id="board_header">
                <nav className="board_header_nav">
                    <ul>
                        <li><p className={cn("board_header_content c1",{click_header:click==="c1"})} onClick={headerClickHandler}>자유게시판</p></li>
                        <li><p className={cn("board_header_content c2",{click_header:click==="c2"})} onClick={headerClickHandler}>LCK</p></li>
                        <li><p className={cn("board_header_content c3",{click_header:click==="c3"})} onClick={headerClickHandler}>공략게시판</p></li>
                        <li><p className={cn("board_header_content c4",{click_header:click==="c4"})} onClick={headerClickHandler}>
                            <Link to='/board/shorts'>하이라이트 모음집</Link></p></li>
                    </ul>
                    <div id="board_header_backDrop"></div>
                </nav>
            </div>
        </>
    );
}

export default BoardHeader;