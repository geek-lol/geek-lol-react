import React, {useState} from 'react';
import MyActivityBoard from "./FreeBoard/MyActivityBoard";
import MyAcitivityComment from "./FreeBoard/MyActivityComment";
import MyActivityReport from "./MyActivityReport";
import MyActivityHeader from "./MyActivityHeader";
import MyActivityBoardTemplate from "./FreeBoard/MyActivityBoardTemplate";
const MyActivityMain = ({boardRows,replyRows,reportRows}) => {//서브 메뉴 클릭한 유형 저장, 기본 : 유저관리
    const [pageType, setPageType] = useState("1");
    const changePageType=(num)=>{
        setPageType(num);
    }
    return (
        <div className="my-activity-wrapper">
            <MyActivityHeader changePageType={changePageType} />
            {pageType === "1" && <MyActivityBoardTemplate boardRows={boardRows.boardRow} replyRows={replyRows.boardRow} />}

            {/*<MyActivityReport rows={reportRows}/>*/}
        </div>
    );
};

export default MyActivityMain;