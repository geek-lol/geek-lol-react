import React, {useState} from 'react';
import Header from "../../header/js/Header";
import "../scss/board.scss";
import {CiSearch} from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import cn from "classnames";
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
                <div id="board_header"></div>
                <section id="board_main">
                    <div className="board_nav_bar">
                        <div className="aside">
                            <a className="WritePost">게시글 작성</a>
                            <ul className="nav_bar_listBox">
                                <li className="nav_bar_list click">자유게시판</li>
                                <li className="nav_bar_list">LCK 게시판</li>
                                <li className="nav_bar_list">공략게시판</li>
                                <li className="nav_bar_list">하이라이트</li>
                            </ul>
                        </div>
                    </div>
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
                            <a className="table-content">
                                <div className="num">27687</div>
                                <div className="num">27687</div>
                                <div className="contents">
                                    <span>쇼진/기회/불경 방관 헤카림.</span>
                                    <span>[0]</span>
                                </div>
                                <div className="num">넌 감동이었던 케이틀린</div>
                                <div className="num">1시간 전</div>
                                <div className="num">23</div>
                                <div className="num">0</div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default Board;