import React, {useEffect, useState} from 'react';
import {GoChevronDown} from "react-icons/go";
import cn from "classnames";
import {CiSearch} from "react-icons/ci";
import {json, Link} from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import {TROLL_APPLY_URL, TROLL_RULING_BOARD_URL} from "../../../../config/host-config";
import RequestContent from "./RequestContent";
import {Pagination} from "@mui/material";
import HeaderCard from "./headerCard";

const RequestBoard = ({touch}) => {
    const [hide, setHide] = useState(false);
    const [title, setTitle] = useState("제목");
    const [requestBoard, SetRequestBoard] = useState([]);
    const [type, setType] = useState(null);
    const [toggle, setToggle] = useState(true);
    const [inputContent, setInputContent] = useState("");
    const [rbtitle, setRbTitle] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [cardData1, setCardData1] = useState([]);
    const [cardData2, setCardData2] = useState([]);

    const relativeButtonHandler = (e) => {
        setHide(!hide);
    };
    const offDiv = () => {
        if (hide === true)
            setHide(false);
    };
    const hiddenHandler = (e) => {
        setTitle(e.target.value);
    }
    useEffect(() => {
        getEndTime();
        getCardData();
    }, []);
    useEffect(() => {
        if (title === '제목') {
            setRbTitle('title');
        } else if (title === '제목 + 내용') {
            setRbTitle('mix');
        } else if (title === '작성자') {
            setRbTitle('writer');
        }
    }, [title]);

    useEffect(() => {
        fetch(`${TROLL_APPLY_URL}?type=${type}&page=${page}&size=${10}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
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
                setTotalPage(json.totalPages);
            });
    }, [toggle, page]);
    const toggleHandler1 = () => {
        setToggle(true);
        setType(null);
    };
    const toggleHandler2 = () => {
        setToggle(false);
        setType("like");
    };
    const search = () => {
        fetch(`${TROLL_APPLY_URL}/search`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({type: rbtitle, keyword: inputContent})
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();

                }
            })
            .then(json => {
                if (!json) return;
                SetRequestBoard(json.boardApply);
            });
    }
    const pageHandler = (e) => {
        setPage(e.target.innerText);
    };
    const inputHandler = (e) => {
        setInputContent(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        search();
    };
    const getCardData = async () => {
        await fetch(TROLL_RULING_BOARD_URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200)
                return res.json();
        }).then(json => {
            console.log(json);
            setCardData1([json.currentBoard]);
            setCardData2([json.previousBoard]);
        })
    }
    const [time, setTime] = useState(null);
    const getEndTime = async () => {
        await fetch(`${TROLL_APPLY_URL}/endTime`, {
            method: 'GET',
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            setTime(json);
            setInterval(() => {
                getTimeRemaining(json);
            }, 1000);
        })
    }
    const [day, setDay] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const [timepersent, setTimepersent] = useState(null);


    function getTimeRemaining(localDateTime) {
        const currentDate = new Date();
        const targetDate = new Date(localDateTime);
        const totalTime = targetDate.getTime() - currentDate.getTime();

        const millisecondsPerDay = 72 * 60 * 60 * 1000;
        const remainingPercentage = totalTime > 0 ? (totalTime / millisecondsPerDay) * 100 : 0;

        const timeDiff = totalTime > 0 ? totalTime : 0;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimepersent(remainingPercentage);
        setDay(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    const [prev, setPrev] = useState(true);
    const [current, setCurrent] = useState(false);
    return (
        <div id="board_wrap" onClick={offDiv}>
            <section id="board_main">
                <h2 className="main-vote-title">투표 게시판</h2>
                <div className="card-box">
                    {cardData1.map(item =>
                        <HeaderCard item={item} isBool={prev}/>
                    )}
                    {cardData2.map(item =>
                        <HeaderCard item={item} isBool={current}/>
                    )}


                </div>
                <div className="progress-bar">
                    <ProgressBar
                        width="800px"
                        bgColor="#72D4FE"
                        height="30px"
                        className="progressBar"
                        completed={timepersent}
                        customLabel={Math.round(timepersent) + "%"}
                        customLabelStyles={{margin: "auto"}}
                    />
                    <h2 className="pb">투표종료까지 {day}일{hours}시간{minutes}분{seconds}초 남았습니다.</h2>
                </div>

                <div className="board_list_box">
                    <div className="board_search_box">
                        <div className="toggleBtn">
                            <button className={cn("sorting-button", {toggle: toggle})} onClick={toggleHandler1}>최신글
                            </button>
                            <button className={cn("sorting-button", {toggle: !toggle})} onClick={toggleHandler2}>인기글
                            </button>
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
                            <form onChange={inputHandler} onSubmit={submitHandler}>
                                <input placeholder="게시물 검색"/>
                                <button><CiSearch className="SearchIcon" size={12 * 2}/></button>
                            </form>
                        </div>
                    </div>
                    <div className="board_table_box">
                        {requestBoard.length > 0 ? requestBoard.map(con =>
                                <RequestContent item={con}/>)
                            :
                            <p className="empty-text">- 아직 글이 없습니다. -</p>
                        }

                        <nav className="page-box">
                            <div className="write-btn">
                                <Link to="/board/RequestCreate">글쓰기</Link>
                            </div>
                            <Pagination
                                activePage={page}
                                count={totalPage}
                                variant="outlined"
                                color="primary"
                                shape="rounded"
                                onChange={pageHandler}
                            />
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestBoard;