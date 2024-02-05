import React, {useEffect, useState} from 'react';
import "../scss/Detail.scss";
import {AiFillAlert, AiOutlineLike} from "react-icons/ai";
import {Button, Pagination, TextField} from "@mui/material";
import {DETAIL_URL, REPLY_URL} from "../../../config/host-config";
import {useParams} from "react-router-dom";
import {getCurrentLoginUser} from "../../../utils/login-util";
import BoardReply from "../BoardReply";

const GetData=(Id)=>{
    console.log(Id);
    const API_BASE_URL = DETAIL_URL;
    const [detailList, setDetailList] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}?bulletinId=${Id}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return json;
                setDetailList(json);
            });
    }, []);
    return detailList;
}

const Detail = () => {
    const {Id}=useParams();
    const item= GetData(Id);
    const [inputText, setInputText] = useState();
    const [data,setData]= useState({});
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const [replyText,setReplyText]=useState();
    const [page,setPage]=useState(1);
    useEffect(() => {
        setData({...item});
        console.log(data);
    }, [item]);


    const imageUrl = data.boardMedia;
    //댓글 입력
    const fetchBoardUpload = async () => {
        try {
            // 클라이언트에서 전송할 데이터
            const requestData = {
                context: replyText,  // 필요한 데이터에 맞게 수정
                // 다른 필요한 데이터들을 추가할 수 있음
            };

            const res = await fetch(`${REPLY_URL}/${data.bulletinId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (res.ok) {
                const json = await res.json();
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
    const [replyList,setReplyList]=useState([]);
    const [totalReply,setTotalReply]=useState(0);
    const [totalPage,setTotalPage]=useState();
    // 댓글 리스트 가져오기
    useEffect(() => {
        Replyrendering();
    }, [inputText,data,page,totalReply]);
    const Replyrendering= async ()=>{
        await fetch(`${REPLY_URL}/${data.bulletinId}?page=${page}`, {
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
                setTotalReply(json.totalCount);
                setTotalPage(json.totalPages);
                console.log(json);
            });
    }

    const replyOnChangeHandler = (e) => {
        setReplyText(e.target.value);
    };
    const inputTextHandler = () => {
        setInputText(replyText);
        if(!token) {alert("로그인이 필요한 서비스입니다.");return}
        fetchBoardUpload();
        console.log(replyText);
        setReplyText("");
        setTotalReply(totalReply+1);
        alert("댓글이 등록되었습니다.");
    };
    const pageHandler = (e) => {
        setPage(+e.target.innerText);
    };
    //값을 끌어올 함수
    const getReplyCount=(TotalReply)=>{
        if(totalReply<=0) setTotalReply(0);
        setTotalReply(totalReply-1);
    }
    return (
        <>
            <section id="detail-body">
                <div className="detail-content">
                    <div className="content-top">
                        <h1>{data.title}</h1>
                        <div className="detail-info-box">
                            <div className="info-front">
                                <p>{data.localDateTime}</p><p>|</p>
                                <p>{data.posterId}</p>
                            </div>
                            <div className="info-back">
                                <p>조회수 {data.viewCount-1}</p><p>|</p>
                                <p>댓글 12345</p><p>|</p>
                                <p>추천 1255</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-center">
                        <img src={imageUrl} alt="sadf"/>
                        <p>{data.content}</p>
                    </div>
                    <div className="content-bottom">
                        <p><AiOutlineLike size={8 * 2}/></p>
                        <p className="correction">수정</p>
                        <p className="delete">삭제</p>
                    </div>
                </div>
                <div className="detail-comment">
                    <form className="detail-comment-form" onChange={replyOnChangeHandler} >
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
                            sx={{width: '10%', marginLeft: 1}}
                            onClick={inputTextHandler}
                        >등록</Button>
                    </form>
                    <div className="comment-box">
                        {replyList.map(con=>
                            <BoardReply item={con} getReplyCount={getReplyCount}/>
                        )}
                        <Pagination
                            activePage={page}
                            count={totalPage}
                            variant="outlined"
                            color="primary"
                            shape="rounded"
                            onChange={pageHandler}
                        />

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