import React, {useEffect, useState} from 'react';
import {GoChevronDown} from "react-icons/go";
import cn from "classnames";
import {CiSearch} from "react-icons/ci";
import {Link} from "react-router-dom";
import RequestGather from "./RequestGather";
import ReactPlayer from "react-player";
import {ProgressBar} from "react-bootstrap";
import {TROLL_APPLY_URL} from "../../../../config/host-config";
import RequestContent from "./RequestContent";

const RequestBoard = () => {
    const [hide, setHide] = useState(false);
    const [title, setTitle] = useState("제목");
    const [requestBoard, SetRequestBoard] = useState([]);
    const relativeButtonHandler = (e) => {
        setHide(!hide);
    };
    const offDiv = () => {
        if (hide === true)
            setHide(false);
    };
    const hiddenHandler = (e) => {
        setTitle(e.target.value);
    };
    useEffect(() => {
        fetch(`${TROLL_APPLY_URL}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Apply-Order-Header': 'like'
            },
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;
                SetRequestBoard(json.boardApply);
                console.log(requestBoard);
                // setTotalPage(json.totalPages);
            });
    }, []);

    function BasicExample() {
        return <ProgressBar now={60}/>;
    }

    return (
        <div id="board_wrap" onClick={offDiv}>
            <section id="board_main">
                <div className="card-box">
                    <div className="prev hero">
                        <div className='videoo'>
                            <ReactPlayer
                                url={"/assets/videos/lol.mp4"}
                                width={'300px'}
                                height={'100%'}/>
                        </div>
                        <div className="text"></div>
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + '/assets/lollogo.jpg'} alt=""/>
                        </div>
                        <div className="main-text">
                            <p>누가누가 문제인가요?? ㅅㅂ?</p>
                        </div>
                        <div className="main-text2">
                            <p>이전 투표 글</p>
                        </div>
                    </div>
                    <div className="prev hero">
                        <div className='videoo'>
                            <ReactPlayer
                                url={"/assets/videos/lol.mp4"}
                                width={'300px'}
                                height={'100%'}/>
                        </div>
                        <div className="text second"></div>
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + '/assets/lollogo.jpg'} alt=""/>
                        </div>
                        <div className="main-text">
                            <p>누가누가 문제인가요?? ㅅㅂ?</p>
                        </div>
                        <div className="main-text2">
                            <p>현재투표 글</p>
                        </div>
                    </div>


                </div>
                <div>
                    {BasicExample()}
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
                        {requestBoard.map(con =>
                            <RequestContent item={con}/>
                        )}
                        <nav className="page-box">
                            <div className="write-btn">
                                <Link to="/board/RequestCreate">글쓰기</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestBoard;