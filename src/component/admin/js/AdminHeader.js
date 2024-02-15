import React, {useState} from 'react';
import "../scss/AdminHeader.scss"
import cn from "classnames";
const AdminHeader = ({pageType,changePageType}) => {
    const [types, setTypes] = useState({
       1:true, 2:false, 3:false,
       4:false, 5:false
    });
    const changeType = (key) =>{
        const resetTypes =  {
            1:false, 2:false, 3:false,
            4:false, 5:false
        };
        setTypes({...resetTypes,[key]:true})
    }
    const onClickHandler = (e) =>{
        changePageType(e.target.id);
        changeType(e.target.id)
    }
    return (
        <div className="admin-header-wrapper">
            <h2 className="page-name">관리자 페이지</h2>
            <ul className="admin-list">
                <li id="1" className={cn('admin-list-item',{select:types["1"]})} onClick={onClickHandler}>회원관리</li>
                <li id="2" className={cn('admin-list-item',{select:types["2"]})} onClick={onClickHandler}>자유게시판</li>
                <li id="3" className={cn('admin-list-item',{select:types["3"]})} onClick={onClickHandler}>하이라이트</li>
                <li id="4" className={cn('admin-list-item',{select:types["4"]})} onClick={onClickHandler}>트롤재판소 지원글</li>
                <li id="5" className={cn('admin-list-item',{select:types["5"]})} onClick={onClickHandler}>트롤재판소</li>
            </ul>
        </div>
    );
};

export default AdminHeader;