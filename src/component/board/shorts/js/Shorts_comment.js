import React, {useState} from 'react';
import cn from "classnames";
import {dividerClasses} from "@mui/material";
import Shorts_comment_list from "./Shorts_comment_list";
import '../scss/Shorts_comment.scss'
import {BsCaretLeftFill, BsPlusLg, BsSend} from "react-icons/bs";
import data from "bootstrap/js/src/dom/data";
import * as commentLists from "react-bootstrap/ElementChildren";

const ShortsComment = (props) => {

    return (
        <div className={'comment-container'}>
            <div className={'comment-top'}>
                <div className={'comment-title-box'}>
                    <span className={'comment-title'}>댓글</span>
                    <p className={'comment-count'}>2</p>
                </div>
                <BsPlusLg className={'comment-close-btn'} onClick={props.chkViewComment} />
            </div>
            <div className={'comment-box'}>
                <ul className={'comment-list'}>
                        <Shorts_comment_list />
                </ul>
            </div>
            <div className={'comment-save'}>
                <div className={'comment-save-profile'}>
                    <img src={process.env.PUBLIC_URL + '/assets/test_icon2.jpg'} alt="프로필이미지"/>
                </div>
                <div className={'comment-input-box'}>
                    <input type="text" placeholder={'댓글추가...'}/>
                    <BsSend className={'comment-send'}/>
                </div>
            </div>
        </div>
    );
};

export default ShortsComment;