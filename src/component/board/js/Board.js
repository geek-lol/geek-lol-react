import React, {useState} from 'react';
import Header from "../../header/js/Header";
import "../scss/board.scss";
import {CiSearch} from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import cn from "classnames";
const Board = () => {
    const [hide,setHide]=useState(false);
    const [title,setTitle]=useState("제목");

    const relativeButtonHandler=()=>{
        setHide(!hide);
    }
    const hiddenHandler=(e)=>{
        setTitle(e.target.value);
    }
    return (
        <>
            <Header/>
            <div id="board_wrap">
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
                                        <span>{title}</span>
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
                                    <input/>
                                    <button><CiSearch/></button>
                                </form>
                            </div>
                        </div>
                        <div className="board_table_box">
                            <table>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>날짜</th>
                                    <th>조회</th>
                                    <th>추천</th>
                                </tr>
                                <tr>
                                    <td>번호</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>날짜</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>애도라 코딩하잔...</td>
                                    <td>코딩벌레레</td>
                                    <td>3시간전</td>
                                    <td>5</td>
                                    <td>0</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default Board;