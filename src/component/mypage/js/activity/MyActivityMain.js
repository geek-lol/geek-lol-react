import React, {useState} from 'react';
import MyActivityHeader from "./MyActivityHeader";
import MyActivityBoardTemplate from "./freeBoard/MyActivityBoardTemplate";
import MyActivityShortsTemplate from "./shorts/MyActivityShortsTemplate";
import MyActivityTrollApplyTemplate from "./trollApply/MyActivityTrollApplyTemplate";
import MyActivityTrollTemplate from "./troll/MyActivityTrollTemplate";
const MyActivityMain = () => {//서브 메뉴 클릭한 유형 저장, 기본 : 유저관리
    const [pageType, setPageType] = useState("1");
    const changePageType=(num)=>{
        setPageType(num);
    }
    return (
        <div className="my-activity-wrapper">
            <MyActivityHeader changePageType={changePageType} />
            {pageType === "1" && <MyActivityBoardTemplate  />}
            {pageType === "2" && <MyActivityShortsTemplate/>}
            {pageType === "3" && <MyActivityTrollApplyTemplate/>}
            {pageType === "4" && <MyActivityTrollTemplate />}

            {/*<MyActivityReport rows={reportRows}/>*/}
        </div>
    );
};

export default MyActivityMain;