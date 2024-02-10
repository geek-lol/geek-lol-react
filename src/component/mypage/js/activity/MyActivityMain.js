import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyAcitivityComment from "./MyActivityComment";
import MyActivityReport from "./MyActivityReport";
const MyActivityMain = ({boardRows,replyRows,reportRows}) => {
    return (
        <div className="my-activity-wrapper">
            <MyActivityBoard rows={boardRows}/>
            <MyAcitivityComment rows={replyRows}/>
            <MyActivityReport rows={reportRows}/>
        </div>
    );
};

export default MyActivityMain;