import React, {useState} from 'react';
import AdminHeader from "./AdminHeader";
import UserManagement from "./UserManagement";
import BoardManagement from "./BoardManagement";
import ShortsManagement from "./ShortsManagement";
import TrollApplyManagement from "./TrollApplyManagement";
import TrollManagement from "./TrollManagement";
import {getCurrentLoginUser} from "../../../utils/login-util";



const AdminPage = () => {
    //서브 메뉴 클릭한 유형 저장, 기본 : 유저관리
    const [pageType, setPageType] = useState("1");
    // const role = getCurrentLoginUser().role;
    const role = localStorage.getItem("ROLE");
    const changePageType=(num)=>{
        setPageType(num);
    }

    if (role !== "ADMIN") {
        return (
            <div className={"validate-admin"}>
                <h1>접근 권한이 없습니다.</h1>
                <p>관리자 페이지에 접근하려면 관리자 권한이 필요합니다.</p>
            </div>
        )
    }
    return (
        <>
            <AdminHeader pageType={pageType} changePageType={changePageType}/>
            {pageType === "1" && <UserManagement />}
            {pageType === "2" && <BoardManagement />}
            {pageType === "3" && <ShortsManagement />}
            {pageType === "4" && <TrollApplyManagement />}
            {pageType === "5" && <TrollManagement />}
        </>
    );
};

export default AdminPage;