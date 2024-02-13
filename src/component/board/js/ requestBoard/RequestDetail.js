import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Button, Pagination, TextField} from "@mui/material";
import '../../scss/RequestDetail.scss';
import {AiFillAlert} from "react-icons/ai";
import {json, useParams} from "react-router-dom";
import {REPLY_URL, TROLL_APPLY_REPLY_URL, TROLL_APPLY_URL} from "../../../../config/host-config";
import BoardReply from "../../BoardReply";

const RequestDetail = () => {
    const {id} = useParams();
    const [item,setItem]=useState([]);
    const [replyList, setReplyList] = useState([]);

    const Replyrendering = async () => {
        await fetch(`${TROLL_APPLY_REPLY_URL}/${item.bulletinId}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;
                setReplyList(json.reply);
                // setTotalReply(json.totalCount);
                // setTotalPage(json.totalPages);
            });
    }
    const getDetail=async ()=>{
        await fetch(`${TROLL_APPLY_URL}/detail/${id}`,{
            method:'GET'
        }).then(res=>{
            return res.json(); // JSON 형식으로 응답을 파싱
        }).then(json=>{
            setItem(json);
        })
    }
    useEffect(() => {
        getDetail();
    }, [id]);

    return (
        <div>
            <section className="detailSection">
                <div className="DetailTop">
                    <h1 className="RequestTitle">트롤재판소</h1>
                    <h2 className="subTile">누가 트롤인지 여러분의 손으로 정해보세요!</h2>
                    <div className="btnBox">
                        <button className="Btn1">현재 진행중인 재판 ></button>
                        <button className="Btn2">지난 재판 ></button>
                    </div>
                </div>
                <div className="DetailMid">
                    <h1>{item.title}</h1>
                    <div className="detail-info-box">
                        <div className="info-front">
                            <p>작성일자 - {item.localDateTime}</p><p>|</p>
                            <p>작성자 - {item.posterName}</p>
                        </div>
                        <div className="info-back">
                            <p>조회수 - {item.viewCount - 1}</p><p>|</p>
                            <p>댓글 - {item.replyCount}</p><p>|</p>
                            <p>추천 - {item.upCount}</p>
                        </div>
                    </div>
                    <div className="videoPlayer">
                        <ReactPlayer
                            url={"/assets/videos/test2.mp4"}
                            width='700px'
                            height={'400px'}
                        />
                    </div>

                    <span className="detailContent">{item.content}</span>
                    <div className="votebox">
                        <h2 className="voteTitle">실시간 여론</h2>
                        <div className="vote">
                            <button className="prosbtn">50%</button>
                            <button className="consbtn">50%</button>
                        </div>
                    </div>

                </div>
                <div className="DetailBottom">
                    <h1 className="replyTitle">댓글</h1>
                    <form className="detail-comment-form">
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
                        />
                        <Button
                            id="bttt"
                            variant="outlined"
                            fullWidth
                            sx={{width: '15%', marginLeft: 1}}
                            // onClick={inputTextHandler}
                        >등록</Button>
                    </form>
                    <div className="comment-box">
                        {/*{*/}
                        {/*    replyList.map(con =>*/}
                        {/*        <BoardReply item={con} getReplyCount={getReplyCount}/>*/}
                        {/*    )}*/}
                        <Pagination
                            // activePage={page}
                            // count={totalPage}
                            variant="outlined"
                            color="primary"
                            shape="rounded"
                            // onChange={pageHandler}
                        />
                    </div>
                </div>

            </section>

        </div>
    );
};

export default RequestDetail;