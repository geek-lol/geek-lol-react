import React from 'react';
import "../scss/Detail.scss";
import {AiOutlineLike} from "react-icons/ai";
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
                    <p><AiOutlineLike size={8*2}/></p>
                    <p className="correction">수정</p>
                    <p className="delete">삭제</p>
                </div>
            </div>
            <div className="deatail-comment"></div>
        </section>

        </>
    );
};

export default Detail;