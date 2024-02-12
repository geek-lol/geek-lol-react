import React, {useState} from 'react';
import MyActivityHeader from "./MyActivityHeader";
import MyActivityBoardTemplate from "./freeBoard/MyActivityBoardTemplate";
import MyActivityShortsTemplate from "./shorts/MyActivityShortsTemplate";
import MyActivityTrollTemplate from "./troll/MyActivityTrollTemplate";
import MyActivityTrollApplyTemplate from "./trollApply/MyActivityTrollApplyTemplate";
const MyActivityMain = ({boardRows,replyRows,reportRows}) => {//서브 메뉴 클릭한 유형 저장, 기본 : 유저관리
    const [pageType, setPageType] = useState("1");
    const changePageType=(num)=>{
        setPageType(num);
    }
    return (
        <div className="my-activity-wrapper">
            <MyActivityHeader changePageType={changePageType} />
            {pageType === "1" && <MyActivityBoardTemplate boardRows={boardRows.boardRow} replyRows={replyRows.boardRow} />}
            {pageType === "2" && <MyActivityShortsTemplate boardRows={boardRows.shortsRow} replyRows={replyRows.shortsRow} />}
            {pageType === "3" && <MyActivityTrollApplyTemplate boardRows={boardRows.trollApplyRow} replyRows={replyRows.trollApplyRow} />}
            {pageType === "4" && <MyActivityTrollTemplate boardRows={boardRows.trollRow} replyRows={replyRows.trollRow} />}

            {/*<MyActivityReport rows={reportRows}/>*/}
        </div>
    );
};

export default MyActivityMain;