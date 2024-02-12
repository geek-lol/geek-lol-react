import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyActivityComment from "./MyActivityComment";

const MyActivityTrollTemplate = ({boardRows,replyRows}) => {
    return (
        <div>
            <MyActivityBoard rows={boardRows}/>
            <MyActivityComment rows={replyRows}/>
        </div>
    );
};

export default MyActivityTrollTemplate;