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
                <h2 className='modalTitle'>제목?제목?제목?제목?</h2>
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
            <section id="section">
            <div id="box">
                <div className="infobox">
                        <div className="info"><GoHeart className="p"
                                                       size={15 * 2}/><span>{5}</span>
                        </div>
                        <div className="info"><VscAccount size={15 * 2}/><span>{applyPosterName}</span>
                        </div>
                        <div className="info"><BsChatDots size={15 * 2}/><span>{replyCount}</span>
                        </div>
                        <div className="info"><FaEye size={15 * 2}/><span>{viewCount}</span></div>
                    </div>
                    <div className="live-feed">
                        <div className="videoPlayer">
                            <ReactPlayer
                                light={false}
                                pip={true}
                                controls={true}
                                // url={Video}
                                width='800px'
                                height={'600px'}

                            />
                            <div className="vote-box">

                                <div id="three" className="button BIG-red-button!!!" onClick={() => setShow(true)}>투표하기
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="comment">
                        <div className="messages" id="live-chat">
                            <h1>Title : {title}</h1>
                            <span>{content}</span>
                        </div>
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
                            // value={replyText}
                        />
                        <Button
                            id="bttt"
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
        </>
    );
};

export default SelectDetail;