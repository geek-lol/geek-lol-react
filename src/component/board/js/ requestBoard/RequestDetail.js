import React from 'react';
import ReactPlayer from "react-player";
import {Button, Pagination, TextField} from "@mui/material";
import '../../scss/RequestDetail.scss';
import {AiFillAlert} from "react-icons/ai";

const RequestDetail = () => {
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
                    <h1 className="detailTitle">누가 잘못했나요 ㅠㅠ 판결좀 내주세요</h1>
                    <div className="videoPlayer">
                        <ReactPlayer
                            url={"/assets/videos/test2.mp4"}
                            width='700px'
                            height={'400px'}
                        />
                    </div>

                    <span className="detailContent">아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글아주 긴글</span>
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
                        <div className="comment">
                            <div className="comment-top">
                                <div className="tqbox">
                                    <p>레삐</p><p>|</p>
                                    <p>몇시간전</p>
                                </div>
                                {/*{username === writerId ?*/}
                                {/*    <p style={{paddingRight: '20px', color: 'red'}} onClick={deleteHandler}>삭제</p>*/}
                                {/*    :*/}
                                {/*    <p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>*/}
                                {/*}*/}
                                    <p style={{paddingRight: '20px', color: 'red'}} >삭제</p>

                                    {/*<p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>*/}
                            </div>
                            <div className="comment-content">
                                <span className="ctt">에베베베베베ㅔㅂ</span>
                            </div>
                        </div>
                        {/*<BoardReply />*/}
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