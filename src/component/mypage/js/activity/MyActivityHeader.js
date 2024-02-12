import React, {useState} from 'react';
import "../../scss/MyActivityMain.scss"
import cn from "classnames";
const MyActivityHeader = ({pageType,changePageType}) => {
    const [types, setTypes] = useState({
       1:true, 2:false, 3:false
    });
    const changeType = (key) =>{
        const resetTypes =  {
            1:false, 2:false, 3:false
        };
        setTypes({...resetTypes,[key]:true})
    }
    const onClickHandler = (e) =>{
        changePageType(e.target.id);
        changeType(e.target.id)
    }
    return (
        <div className="my-header-wrapper">
            <h2 className="page-name">내 활동 이력</h2>
            <ul className="my-list">
                <li id="2" className={cn('my-list-item',{select:types["1"]})} onClick={onClickHandler}>자유게시판</li>
                <li id="3" className={cn('my-list-item',{select:types["2"]})} onClick={onClickHandler}>하이라이트</li>
                <li id="4" className={cn('my-list-item',{select:types["3"]})} onClick={onClickHandler}>트롤재판소</li>
            </ul>
        </div>
    );
};

export default MyActivityHeader;