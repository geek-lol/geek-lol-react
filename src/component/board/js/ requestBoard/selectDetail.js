import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Pagination, TextField} from "@mui/material";
import {json, useLocation} from "react-router-dom";
import "../../scss/SelectDetail.scss";
import {Button, Modal} from 'react-bootstrap';
import {GiLuciferCannon} from "react-icons/gi";
import {
    TROLL_RULING_BOARD_URL,
    TROLL_RULING_REPLY_URL,
    TROLL_RULING_VOTE_URL
} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import SelectBoardReply from "../../SelectBoardReply";
import {formatDate} from "../../../../utils/format-date";

const SelectDetail = () => {
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const {
        title,
        applyPosterId,
        applyPosterName,
        content,
        replyCount,
        rulingDate,
        viewCount
    } = location.state.data || {};
    const {rulingId} = location.state.rulingId || {};
    const [vs, setVs] = useState(0);
    const [Video, setVideo] = useState();
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [replyText, setReplyText] = useState();
    const [inputText, setInputText] = useState();
    const [totalReply, setTotalReply] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [likeToggle, setLikeToggle] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [totalLike, setTotalLike] = useState(null);
    const [vote, setVote] = useState(null);

    useEffect(() => {
        getImg();
    }, []);
    useEffect(() => {
        Replyrendering();
    }, [title, inputText, page, totalReply]);
    const Replyrendering = async () => {
        await fetch(`${TROLL_RULING_REPLY_URL}/${location.state.rulingId}?page=${page}`, {
            method: 'GET',
            headers: {'content-type': 'application/json',},
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;
                // console.log(json.reply);
                setReplyList(json.reply);
                setTotalReply(json.totalCount);
                setTotalPage(json.totalPages);
            });
    }
    const [pros, setPros] = useState("찬성");
    const [cons, setCons] = useState("반대");
    const [c, setC] = useState(null);
    const [p, setP] = useState(null);

    const getVoteData = async () => {
        await fetch(`${TROLL_RULING_VOTE_URL}/${location.state.rulingId}`, {
            method: 'GET',
            headers: {'content-type': 'application/json',},
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            // console.log(json);

            setC(json.cons);
            setP(json.pros);

        })
    }
    const setVoteData = async (text) => {
        await fetch(`${TROLL_RULING_VOTE_URL}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({vote: text, rulingId: location.state.rulingId})
        }).then(res => {
            if(res.status===200){return res.json();}
            // console.log(res.status);
        }).then(json=>{
            if(json===undefined){
                return}
            setCons(Math.round(json.consPercent)+"%");
            setPros(Math.round(json.prosPercent)+"%");
            setC(json.cons);
            setP(json.pros);
        })
    }

    const getImg = async () => {
        try {
            const response = await fetch(`${TROLL_RULING_BOARD_URL}/load-video/${location.state.rulingId}`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer]);
            const videoUrl = URL.createObjectURL(blob);
            setVideo(videoUrl);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    }

    const $blue_btn = document.querySelector('.blue-btn');
    const $red_btn = document.querySelector('.red-btn');
    const [show, setShow] = useState(false);
    const blueClickHandler = () => {
        // setVote();
        setVs(1);
        setVoteData("pros");
        $blue_btn.style.width = "350px";
        $red_btn.style.width = "150px";
    };
    useEffect(() => {
        getVoteData();
    }, [vote]);
    const redClickHandler = () => {
        // setVote();
        setVs(2);
        setVoteData("cons");
        $red_btn.style.width = "350px";
        $blue_btn.style.width = "150px";
    };

    const fetchBoardUpload = async () => {
        try {
            // 클라이언트에서 전송할 데이터
            const requestData = {
                context: replyText,  // 필요한 데이터에 맞게 수정
                // 다른 필요한 데이터들을 추가할 수 있음
            };

            const res = await fetch(`${TROLL_RULING_REPLY_URL}/${location.state.rulingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });
            if (res.ok) {
                // const json = await res.json();
                // console.log(json);
                // 성공적으로 처리된 경우에 수행할 작업 추가
            } else {
                console.error('Error:', res.status);
                // 에러 처리 로직 추가
            }
        } catch (error) {
            console.error('Error:', error);
            // 예외 처리 로직 추가
        }
    };
    const replyOnChangeHandler = (e) => {
        setReplyText(e.target.value);
    };
    const inputTextHandler = () => {
        setInputText(replyText);
        if (!token) {
            alert("로그인이 필요한 서비스입니다.");
            return
        }
        fetchBoardUpload();
        setReplyText("");
        setTotalReply(totalReply + 1);
        alert("댓글이 등록되었습니다.");
    };
    const getReplyCount = () => {
        if (totalReply <= 0) setTotalReply(0);
        setTotalReply(totalReply - 1);
    }
    const pageHandler = (e) => {
        setPage(+e.target.innerText);
    };
    return (
        <>
            <div className="bg">
                <section className="detailSection">
                    <div className="DetailTop">
                        <h1 className="RequestTitle">트롤재판소</h1>
                        <h2 className="subTile">누가 트롤인지 여러분의 손으로 정해보세요!</h2>
                    </div>
                    <div className="DetailMid">
                        <h1>{title}</h1>
                        <div className="detail-info-box">
                            <div className="info-front">
                                <p>작성일자  {formatDate(rulingDate,"day")}</p><p>|</p>
                                <p>작성자 : {applyPosterName}</p>
                            </div>
                            <div className="info-back">
                                <p>조회수  {viewCount - 1}</p><p>|</p>
                                <p>댓글  {replyCount}</p>
                            </div>
                        </div>
                        <div className="videoPlayer">
                            <ReactPlayer
                                light={false}
                                pip={true}
                                controls={true}
                                url={Video}
                                width='700px'
                                height={'400px'}
                            />
                        </div>
                        <span className="detailContent">{content}</span>
                        <div className="vote-box">
                            <div className='blue-box'>
                                <img src={process.env.PUBLIC_URL + '/assets/bluepng-removebg.png'} alt=""/>
                                <hr className='hr'/>
                                <div id="three" className="button BIG-red-button blue-btn" onClick={blueClickHandler}>{pros}
                                </div>
                            </div>
                            <div className="empty-box">
                                {vs === 0 ?
                                    <h2 className="vs">VS<br/><p>투표수<br/>{c + p}</p></h2> : vs === 1 ?
                                        <div><GiLuciferCannon size={22 * 2}></GiLuciferCannon><br/><p>투표수<br/>{c + p}
                                        </p></div>
                                        :
                                        <div><GiLuciferCannon size={22 * 2} style={{transform: 'scaleX(-1)'}}/><br/><p>
                                            투표수<br/>{c + p}
                                        </p></div>
                                }
                            </div>
                            <div className='red-box'>
                                <img src={process.env.PUBLIC_URL + '/assets/red-removebg.png'} alt=""/>
                                <hr className='hr'/>

                                <div id="three" className="button BIG-red-button red-btn" onClick={redClickHandler}>{cons}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="DetailBottom">
                        <h1 className="replyTitle">댓글</h1>
                        <form className="detail-comment-form" onChange={replyOnChangeHandler}>
                            <TextField
                                id="outlined-basic"
                                label="댓글 쓰기"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                maxRows={3}
                                sx={{
                                    fontSize: 36,
                                    width: '90%',
                                    borderRadius: '34px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                                value={replyText}
                            />
                            <Button
                                id="bttt"
                                variant="outlined"
                                fullWidth
                                sx={{width: '15%', marginLeft: 1}}
                                onClick={inputTextHandler}
                            >등록</Button>
                        </form>
                        <div className="comment-box">
                            {
                                replyList.map(con =>
                                    <SelectBoardReply item={con} getReplyCount={getReplyCount}/>
                                )}
                            <Pagination
                                className="tq"
                                activePage={page}
                                count={totalPage}
                                variant="outlined"
                                color="primary"
                                shape="rounded"
                                onChange={pageHandler}
                            />
                        </div>
                    </div>

                </section>
            </div>
        </>
    );
};

export default SelectDetail;