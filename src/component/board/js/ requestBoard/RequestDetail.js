import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Button, Pagination, TextField} from "@mui/material";
import '../../scss/RequestDetail.scss';
import {AiFillAlert} from "react-icons/ai";
import {json, useParams} from "react-router-dom";
import {
    TROLL_APPLY_REPLY_URL,
    TROLL_APPLY_URL, TROLL_APPLY_VOTE_URL,
} from "../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../utils/login-util";
import RequestBoardReply from "../../RequestBoardReply";
import {VscAccount} from "react-icons/vsc";
import {BiSolidLike} from "react-icons/bi";
import {IoCalendarOutline} from "react-icons/io5";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
import {GoHeart, GoHeartFill} from "react-icons/go";

const RequestDetail = () => {
    const {id} = useParams();
    const [item, setItem] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [replyText, setReplyText] = useState();
    const [inputText, setInputText] = useState();
    const [totalReply, setTotalReply] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [page, setPage] = useState(1);
    const [likeToggle, setLikeToggle] = useState(null);
    const [totalLike, setTotalLike] = useState(null);

    const Replyrendering = async () => {
        await fetch(`${TROLL_APPLY_REPLY_URL}/${id}?page=${page}`, {
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
                setReplyList(json.reply);
                setTotalReply(json.totalCount);
                setTotalPage(json.totalPages);
            });
    }
    const [Video, setVideo] = useState();
    const getImg = async () => {
        try {
            const response = await fetch(`${TROLL_APPLY_URL}/load-video?applyId=${id}`, {
                method: 'GET'
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
    const getDetail = async () => {
        await fetch(`${TROLL_APPLY_URL}/detail/${id}`, {
            method: 'GET'
        }).then(res => {
            return res.json(); // JSON 형식으로 응답을 파싱
        }).then(json => {
            setItem(json);
            console.log(json);
            setTotalLike(json.upCount);
        })
    }
    const fetchBoardUpload = async () => {
        try {
            // 클라이언트에서 전송할 데이터
            const requestData = {
                context: replyText,  // 필요한 데이터에 맞게 수정
                // 다른 필요한 데이터들을 추가할 수 있음
            };

            const res = await fetch(`${TROLL_APPLY_REPLY_URL}/${id}`, {
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

    useEffect(() => {
        getDetail();
        findLike();
        getImg();
    }, [id]);
    useEffect(() => {
        Replyrendering();
    }, [id, inputText, page, totalReply]);
    const createLike = async () => {
        const res = await fetch(`${TROLL_APPLY_VOTE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({applyId: id})
        }).then(res => {
            if (res.status === 200) {
                console.log("잘 만들어짐");
            }
            if (res.status === 400) {
                console.log('이미 만들어짐');
            }
        })
    }
    const modifyLike = async () => {
        const res = await fetch(`${TROLL_APPLY_VOTE_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({applyId: id})
        }).then(res => {
            if (res.status === 200) {
                console.log("좋아요 수정 됨");
                findLike();
            }
        })
    }
    const findLike = async () => {
        try {
            const res = await fetch(`${TROLL_APPLY_VOTE_URL}?applyId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const json = await res.json(); // JSON 형식으로 파싱
                console.log('조회잘됨');
                setLikeToggle(json.up);
                console.log("TOTAL:"+json.total);
                setTotalLike(json.total);
            } else {
                console.log("조회 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
            createLike();
        }
    }
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

    const likeHanlder = () => {
        modifyLike();
    };

    return (
        <>
            <section id="section">
                <div className="box">
                    <div className="live-feed">
                        <div className="videoPlayer">
                            <ReactPlayer
                                light={false}
                                pip={true}
                                controls={true}
                                url={Video}
                                width='800px'
                                height={'600px'}

                            />
                            <div className="infobox">
                                {
                                    likeToggle === 0 ?
                                        <div className="info" onClick={likeHanlder}><GoHeart className="p"
                                                                                             size={15 * 2}/><span>{totalLike}</span>
                                        </div>
                                        :
                                        <div className="info" onClick={likeHanlder}><GoHeartFill className="p"
                                                                                                 color="red"
                                                                                                 size={15 * 2}/><span>{totalLike}</span>
                                        </div>

                                }
                                <div className="info"><VscAccount size={15 * 2}/><span>{item.posterName}</span></div>
                                <div className="info"><BsChatDots size={15 * 2}/><span>{item.reportCount}</span></div>
                                <div className="info"><FaEye size={15 * 2}/><span>{item.viewCount}</span></div>
                            </div>
                        </div>

                    </div>
                    <div className="comment">
                        <div className="messages" id="live-chat">
                            <h1>Title : {item.title}</h1>
                            <span>{item.content}</span>
                        </div>
                    </div>
                </div>
                <div className="detail-comment">
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
                            fullWidth
                            sx={{width: '10%', marginLeft: 1}}
                            onClick={inputTextHandler}
                        >등록</Button>
                    </form>
                    <div className="comment-box">
                        {
                            replyList.map(con =>
                                <RequestBoardReply item={con} getReplyCount={getReplyCount}/>
                            )}
                        <Pagination
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
        </>


    );
};

export default RequestDetail;