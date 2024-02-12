import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyActivityComment from "./MyActivityComment";

const MyActivityShortsTemplate = ({boardRows,replyRows}) => {
    return (
        <div>
            <MyActivityBoard rows={boardRows}/>
            <MyActivityComment rows={replyRows}/>
        </div>
    );
};

export default MyActivityShortsTemplate;