import React from 'react';
import cn from "classnames";
import {dividerClasses} from "@mui/material";
import Shorts_comment_list from "./Shorts_comment_list";

const ShortsComment = () => {
    return (
        <div className={'comment-container'}>
            <div className={'comment-title-box'}>
                <p>댓글</p>
                <p>2</p>
            </div>
            <div className={'comment-box'}>
                <Shorts_comment_list />
            </div>
            <div className={'comment-save'}>
                <div className={'comment-profile'}>

                </div>
                <div className={'comment-input-box'}>

                </div>
            </div>
        </div>
    );
};

export default ShortsComment;