import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../scss/Board_header.scss';
import cn from "classnames";
function BoardHeader(props) {
    const [click,setClick]=useState(false);
    const headerClickHandler=(e)=>{
        setClick(!click);
        console.log(click);
    }
    return (
        <>
            <div id="board_header">
                <nav className="board_header_nav">
                    <ul>
                        <li><p className={cn("board_header_content",{click_header:click})} onClick={headerClickHandler}>자유게시판</p></li>
                        <li><p className="board_header_content">LCK</p></li>
                        <li><p className="board_header_content">공략게시판</p></li>
                        <li><p className="board_header_content">하이라이트 모음집</p></li>
                    </ul>
                    <div id="board_header_backDrop"></div>
                </nav>
            </div>
        </>
    );
}

export default BoardHeader;