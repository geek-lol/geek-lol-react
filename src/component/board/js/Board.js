import React, {useState} from 'react';
import Header from "../../header/js/Header";
import "../scss/board.scss";
import {CiSearch} from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import cn from "classnames";
import BoardContent from "./BoardContent";
import BoardHeader from "./Board_header";
import {
    MdKeyboardArrowLeft,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowRight
} from "react-icons/md";
const Board = () => {
    const [hide,setHide]=useState(false);
    const [title,setTitle]=useState("제목");

    const relativeButtonHandler=(e)=>{
        setHide(!hide);
    }
    const offDiv=()=>{
        if(hide===true)
            setHide(false);
    }
    const hiddenHandler=(e)=>{
        setTitle(e.target.value);
    }
    return (
        <>
            <Header/>
            <div id="board_wrap" onClick={offDiv}>
                <BoardHeader/>
                <section id="board_main">
                    <div className="board_list_box">
                        <div className="board_search_box">
                            <div className="toggleBtn">
                                <button className="sorting-button toggle">최신글</button>
                                <button className="sorting-button">인기글</button>
                            </div>
                            <div className="searchT">
                                <div className="relative">
                                    <button className="relativeBtn" onClick={relativeButtonHandler}>
                                        <span className="asdasd">{title}</span>
                                        <GoChevronDown size={12*2}/>
                                        <div className={cn("hiddenSelect",{hide:hide})}>
                                            <ul>
                                                <li><button onClick={hiddenHandler} value="제목">제목</button></li>
                                                <li><button onClick={hiddenHandler} value="제목 + 내용">제목 + 내용</button></li>
                                                <li><button onClick={hiddenHandler} value="작성자">작성자</button></li>
                                            </ul>
                                        </div>
                                    </button>
                                </div>
                                <form>
                                    <input placeholder="게시물 검색" />
                                    <button><CiSearch className="SearchIcon" size={12*2}/></button>
                                </form>
                            </div>
                        </div>
                        <div className="board_table_box">
                            <div className="table">
                                <span className="s-title1 py-1">번호</span>
                                <span className="s-title2 py-1">제목</span>
                                <span className="s-title3 py-1">작성자</span>
                                <span className="s-title4 py-1">날짜</span>
                                <span className="s-title5 py-1">조회</span>
                                <span className="s-title6 py-1">추천</span>
                            </div>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <BoardContent/>
                            <nav className="page-box">
                                <ul className="arrowBox">
                                    <li className="arrow"><MdKeyboardDoubleArrowLeft size={12 * 2}/></li>
                                    <li className="arrow"><MdKeyboardArrowLeft size={12 * 2}/></li>
                                    <li className="arrow">1</li>
                                    <li className="arrow">2</li>
                                    <li className="arrow"><MdOutlineKeyboardArrowRight size={12 * 2}/></li>
                                    <li className="arrow"><MdKeyboardDoubleArrowRight size={12 * 2}/></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default Board;