import React, {useEffect, useState} from 'react';
import '../scss/Board_header.scss';
import cn from "classnames";
import {Link} from "react-router-dom";
function BoardHeader({touch}) {
    const [click,setClick]=useState("");
    //게시판 로드시 헤더 표시
    useEffect(() => {
        if (window.location.href.includes("FreeBoard")) {
            setClick("c1");
        }
        if (window.location.href.includes("Request")) {
            setClick("c2");
        }
        if (window.location.href.includes("Short")) {
            setClick("c3");
        }
    }, [click,touch]);

    const headerClickHandler = (e) => {
        const classToClickMap = {
            "c1": "c1",
            "c2": "c2",
            "c3": "c3",
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
                        <Link to="/board/main/FreeBoard" className="aaa" ><p className={cn("board_header_content c1",{click_header:click==="c1"})} onClick={headerClickHandler} >자유게시판</p></Link>
                        <Link to="/board/main/Request"className="aaa" ><p className={cn("board_header_content c2",{click_header:click==="c2"})} onClick={headerClickHandler}>트롤재판소</p></Link>
                        <Link to="#"><p className={cn("board_header_content aaa c4",{click_header:click==="c4"})} onClick={headerClickHandler}>
                            <Link to='/board/shorts'>하이라이트 모음집</Link></p></Link>
                    </ul>
                    <div id="board_header_backDrop"></div>
                </nav>
            </div>
        </>
    );
}

export default BoardHeader;