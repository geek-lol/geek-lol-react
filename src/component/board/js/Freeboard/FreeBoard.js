import React, {useEffect, useState} from 'react';
import {GoChevronDown} from "react-icons/go";
import cn from "classnames";
import {CiSearch} from "react-icons/ci";
import {
    MdKeyboardArrowLeft,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowRight
} from "react-icons/md";
import BoardGather from "./BoardGather";
import {Link} from "react-router-dom";
import {BOARD_URL} from "../../../../config/host-config";
import Board from "../Board";
const FreeBoard = () => {
    const [boardList, setBoardList] = useState([]);
    const API_BASE_URL = BOARD_URL
    const [hide, setHide] = useState(false);
    const [title, setTitle] = useState("제목");
    const relativeButtonHandler = (e) => {
        setHide(!hide);
    }
    const offDiv = () => {
        if (hide === true)
            setHide(false);
    }
    const hiddenHandler = (e) => {
        setTitle(e.target.value);
    }
    useEffect(() => {
        fetch(API_BASE_URL, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;

                // console.log(json);
                setBoardList(json.board);
                console.log(json.board);
            });
        }, []);

    return (
        <div id="board_wrap" onClick={offDiv} style={{marginTop:'97.99px'}}>
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
                                    <GoChevronDown size={12 * 2}/>
                                    <div className={cn("hiddenSelect", {hide: hide})}>
                                        <ul>
                                            <li>
                                                <button onClick={hiddenHandler} value="제목">제목</button>
                                            </li>
                                            <li>
                                                <button onClick={hiddenHandler} value="제목 + 내용">제목 + 내용</button>
                                            </li>
                                            <li>
                                                <button onClick={hiddenHandler} value="작성자">작성자</button>
                                            </li>
                                        </ul>
                                    </div>
                                </button>
                            </div>
                            <form>
                                <input placeholder="게시물 검색"/>
                                <button><CiSearch className="SearchIcon" size={12 * 2}/></button>
                            </form>
                        </div>
                    </div>
                    <div className="board_table_box">
                        <div className="table">
                            <span className="s-title1 py-1">번호</span>
                            {<span className="s-title1 py-1"></span>}
                            <span className="s-title2 py-1">제목</span>
                            <span className="s-title3 py-1">작성자</span>
                            <span className="s-title4 py-1">날짜</span>
                            <span className="s-title5 py-1">조회</span>
                            <span className="s-title6 py-1">추천</span>
                        </div>
                        <BoardGather/>
                        {/*<LCKboard/>*/}
                        <nav className="page-box">
                            <div className="write-btn">
                                <Link to="/board/create">글쓰기</Link>
                            </div>
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
    );
}
export default FreeBoard;