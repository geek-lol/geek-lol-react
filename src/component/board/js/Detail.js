import React from 'react';
import "../scss/Detail.scss";
import {AiFillAlert, AiOutlineLike} from "react-icons/ai";
import {Button, TextField} from "@mui/material";

const Detail = () => {
    return (
        <>
            <section id="detail-body">
                <div className="detail-content">
                    <div className="content-top">
                        <h1>애도라 코딩하잔...</h1>
                        <div className="detail-info-box">
                            <div className="info-front">
                                <p>2024-01-15 오후 10:00</p><p>|</p>
                                <p>코딩벌레레</p>
                            </div>
                            <div className="info-back">
                                <p>조회수 12345</p><p>|</p>
                                <p>댓글 12345</p><p>|</p>
                                <p>추천 1255</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-center">
                        <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="sadf"/>
                        <p>글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단글내용입니다단</p>
                    </div>
                    <div className="content-bottom">
                        <p><AiOutlineLike size={8 * 2}/></p>
                        <p className="correction">수정</p>
                        <p className="delete">삭제</p>
                    </div>
                </div>
                <div className="detail-comment">
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
                            sx={{width: '10%', marginLeft: 1}}

                        >등록</Button>
                    </form>
                    <div className="comment-box">
                        <div className="comment">
                            <div className="comment-top">
                                <div className="tqbox">
                                    <p>작성자</p><p>|</p>
                                    <p>1분전</p>
                                </div>
                                <p style={{paddingRight:'20px' ,color:'red'}}>삭제</p>
                                {/*<p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>*/}
                            </div>
                            <div className="comment-content">
                                <span className="ctt">안녕하세욯ㅇㅎㅇㅎㅇㅎㅇㅎㅇ</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-top">
                                <div className="tqbox">
                                    <p>작성자</p><p>|</p>
                                    <p>1분전</p>
                                </div>
                                {/*<p style={{paddingRight:'20px' ,color:'red'}}>삭제</p>*/}
                                <p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>
                            </div>
                            <div className="comment-content">
                                <span className="ctt">안녕하세욯ㅇㅎㅇㅎㅇㅎㅇㅎㅇ</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-top">
                                <div className="tqbox">
                                    <p>작성자</p><p>|</p>
                                    <p>1분전</p>
                                </div>
                                {/*<p style={{paddingRight:'20px' ,color:'red'}}>삭제</p>*/}
                                <p style={{paddingRight: '20px', color: 'black'}}><AiFillAlert/>신고하기</p>
                            </div>
                            <div className="comment-content">
                                <span className="ctt">안녕하세욯ㅇㅎㅇㅎㅇㅎㅇㅎㅇ</span>
                            </div>
                        </div>
                        <div className="moveBox">
                            <button className="move-button clicked">이전글</button>
                            <button className="move-button">게시판으로</button>
                            <button className="move-button">다음 글</button>
                        </div>

                    </div>
                </div>
            </section>

        </>
    );
};

export default Detail;