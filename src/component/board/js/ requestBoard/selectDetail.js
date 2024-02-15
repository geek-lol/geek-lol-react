import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Pagination, TextField} from "@mui/material";
import {useLocation} from "react-router-dom";
import "../../scss/SelectDetail.scss";
import {VscAccount} from "react-icons/vsc";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
import {GoHeart} from "react-icons/go";
import {Button, Modal} from 'react-bootstrap';
import {GiLuciferCannon} from "react-icons/gi";
import RequestBoardReply from "../../RequestBoardReply";
const SelectDetail = () => {
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const {title, applyPosterId, applyPosterName, content, replyCount, rulingDate, viewCount} = location.state.data;
    const {rulingId, isBool} = location.state;
    const [vs,setVs]=useState(0);
    useEffect(() => {
        console.log(title);
    }, []);

    const [show, setShow] = useState(false);
    const blueClickHandler = () => {
        const $blue_btn =document.querySelector('.blue-btn');
        const $red_btn =document.querySelector('.red-btn');
        setVs(1);
        $blue_btn.style.width="400px";
        $red_btn.style.width="150px";
    };
    const redClickHandler = () => {
        const $blue_btn =document.querySelector('.blue-btn');
        const $red_btn =document.querySelector('.red-btn');
        setVs(2);
        $red_btn.style.width="400px";
        $blue_btn.style.width="150px";
    };
    return (
        <>
            <Modal
                size='lg'
                className="modal"
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        투표하기
                    </Modal.Title>
                </Modal.Header>
                <h2 className='modalTitle'>{title}</h2>
                <Modal.Body>


                    <div className="modal-body">
                        <div className='blue-box'>

                            <img src={process.env.PUBLIC_URL + '/assets/bluepng-removebg.png'} alt=""/>
                            <hr className='hr'/>
                            <div id="three" className="button BIG-red-button blue-btn" onClick={blueClickHandler}>찬성
                            </div>
                        </div>
                        <div className="empty-box">
                            {vs === 0 ?
                                <h2 className="vs">VS</h2> : vs === 1 ?
                                    <GiLuciferCannon size={22 * 2}/>
                                    :
                                    <GiLuciferCannon size={22 * 2} style={{transform: 'scaleX(-1)'}}/>

                            }
                        </div>
                        <div className='red-box'>
                            <img src={process.env.PUBLIC_URL + '/assets/red-removebg.png'} alt=""/>
                            <hr className='hr'/>

                            <div id="three" className="button BIG-red-button red-btn" onClick={redClickHandler}>반대
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
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
                        <h1>{title}</h1>
                        <div className="detail-info-box">
                            <div className="info-front">
                                <p>작성일자 - {rulingDate}</p><p>|</p>
                                <p>작성자 - {applyPosterName}</p>
                            </div>
                            <div className="info-back">
                                <p>조회수 - {viewCount - 1}</p><p>|</p>
                                <p>댓글 - {replyCount}</p><p>|</p>
                                {/*<p>추천 - {upCount}</p>*/}
                            </div>
                        </div>
                        <div className="videoPlayer">
                            <ReactPlayer
                                light={false}
                                pip={true}
                                controls={true}
                                // url={Video}
                                width='800px'
                                height={'600px'}
                            />


                        </div>

                        <span className="detailContent">{content}</span>
                        <div className="vote-box">

                            <div id="three" className="button BIG-red-button!!!" onClick={() => setShow(true)}>투표하기
                            </div>
                        </div>


                    </div>
                    <div className="DetailBottom">
                        <h1 className="replyTitle">댓글</h1>
                        <form className="detail-comment-form" >
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
                                // value={replyText}
                            />
                            <Button
                                id="bttt"
                                variant="outlined"
                                fullWidth
                                sx={{width: '10%', marginLeft: 1}}
                                // onClick={inputTextHandler}
                            >등록</Button>
                        </form>
                        <div className="comment-box">
                            {/*{*/}
                            {/*    replyList.map(con =>*/}
                            {/*        <RequestBoardReply item={con} getReplyCount={getReplyCount}/>*/}
                            {/*    )}*/}
                            <Pagination
                                activePage={page}
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
        </>
    );
};

export default SelectDetail;