import React, {useRef, useState} from 'react';
import {BiBlock, BiHeart, BiMessage} from "react-icons/bi";
import '../scss/Shorts_content.scss'
import Shorts_header from "./Shorts_header";
import {BsChatLeft, BsExclamationCircle, BsHeart} from "react-icons/bs";
import cn from "classnames";
import Shorts_comment from "./Shorts_comment";
import Team1ItemDetail from "../../../spector/js/Team1ItemDetail";
import BanPick from "../../../spector/js/BanPick";
import Team2ItemDetail from "../../../spector/js/Team2ItemDetail";

const ShortsContent = () => {
    const [viewComment, setViewComment] = useState(false);

    const chkViewComment = e => {
        setViewComment(!viewComment);
    }

    // 신고 모달 띄우기
    const [viewReport, setViewReport] = useState(false);
    const modalBackground = useRef();

    return (
            <div className={'content-container'}>
                <div className={'short-form'}>
                    <div className={'content'}>
                        <video src="#" className={'short-video'}></video>
                        <div className={'produce'}>
                            <div className={'profile_box'}>
                                <div className={'profile-img'}>
                                    <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                                </div>
                                <div className={'profile-name'}>
                                    <p>우와앙아</p>
                                </div>
                            </div>
                            <div className={'short-title'}>
                                <p>구왕과왁왁</p>
                            </div>
                        </div>
                    </div>
                    <div className={'sidebar'}>
                        <div className={'short-btn like-btn'}>
                            <BsHeart className={'btn'}/>
                            {/* <BsHeartFill /> */}
                            <p>1300</p>
                        </div>
                        <div className={'short-btn comment-btn'}>
                            <BsChatLeft className={'btn'} onClick={chkViewComment}/>
                            <p>2</p>
                        </div>
                        <div className={'short-btn report-btn'}>
                            <BsExclamationCircle className={'btn'} onClick={() => setViewReport(true)}/>
                        </div>
                    </div>
                </div>
                <div className={'comment-form'}>
                    <div className={cn("comment", {comment_view: viewComment})}>
                        <div className={'comment-wrapper'}>
                            <Shorts_comment/>
                        </div>
                    </div>
                </div>

            {
                viewReport &&
                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setViewReport(false);
                    }
                }}>
                    <div className={'modal-report'}>
                        <div className={'modal-report-text'}>
                            <p>정말 신고하시겠습니까?</p>
                        </div>
                        <div className={'modal-btns'}>
                            <div className={'modal-cancel-btn'} onClick={() => setViewReport(false)}>
                                <p>취소</p>
                            </div>
                            <div className={'modal-correct-btn'}>
                                <p>확인</p>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    );


};

export default ShortsContent;