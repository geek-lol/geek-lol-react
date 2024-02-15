import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Button, Pagination, TextField} from "@mui/material";
import {useLocation} from "react-router-dom";
import "../../scss/SelectDetail.scss";
import {VscAccount} from "react-icons/vsc";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
import {GoHeart} from "react-icons/go";
import Buttons from "../Buttons";

const SelectDetail = () => {
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const {title, applyPosterId, applyPosterName, content, replyCount, rulingDate, viewCount} = location.state.data;
    const {rulingId, isBool} = location.state;
    useEffect(() => {
        console.log(title);
    }, []);


    const handleButtonClick = (e) => {
        const buttonId = e.target.id;
        document.getElementById('modal-container').className = buttonId;
        document.getElementById("section").classList.add('modal-active');
    };

    const handleModalContainerClick = () => {
        document.getElementById('modal-container').classList.add('out');
        document.getElementById("section").classList.remove('modal-active');
    };
    return (
        <>
            <div id="modal-container" >
                <div className="modal-background" onClick={handleButtonClick}>
                    <div className="modal">
                        <h2>I'm a Modal</h2>
                        <p>Hear me roar.</p>

                    </div>
                </div>
            </div>
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
                                <div id="three" className="button BIG-red-button!!!" onClick={handleButtonClick}>투표하기</div>
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