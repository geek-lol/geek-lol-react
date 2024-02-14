import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {Button, Pagination, TextField} from "@mui/material";
import { useLocation} from "react-router-dom";
import {

    TROLL_RULING_BOARD_URL
} from "../../../../config/host-config";
import {VscAccount} from "react-icons/vsc";
import {BsChatDots} from "react-icons/bs";
import {FaEye} from "react-icons/fa";
import {GoHeart} from "react-icons/go";

const SelectDetail = () => {
    const [dataList, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const{title,applyPosterId,applyPosterName,content,replyCount,rulingDate,viewCount}=location.state.data;
    const {rulingId, isBool} = location.state;
    useEffect(() => {
        console.log(title);
    }, []);



    return (
        <>
            <section id="section">

                <div className="box">
                    <div className="infobox">
                        {/*<div className="info"><GoHeart className="p"*/}
                        {/*                               size={15 * 2}/><span>{dataList[0].upCount}</span>*/}
                        {/*</div>*/}


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