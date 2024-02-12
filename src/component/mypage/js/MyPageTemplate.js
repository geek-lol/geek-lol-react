import React, {useEffect, useState} from 'react';
import MypageSideMenu from "./MypageSideMenu";
import MyPageProfile from "./profile/MyPageProfile";
import MyInformation from "./info/MyInformation";
import MyActivityMain from "./activity/MyActivityMain";

import {getCurrentLoginUser} from "../../../utils/login-util";

const MyPageTemplate = () => {
    //mypage 렌더링 유형을 저장
    const [pageType, setPageType] = useState(1);

    const [myActivity, setMyActivity] = useState({
        boards : 0,
        comments : 0,
        reports : 0
    })

    // 유저 정보를 저장할
    const [userInfo , setUserInfo] = useState({
        joinMembershipDate:"",
        userId: "",
        userName:""
    });
    // 페이지별 게시글 목록들
    const [boardRows,setBoardRows] = useState({
        boardRow:[],
        shortsRow:[],
        trollRow:[],
        trollApplyRow:[],
    });
    const [boardRowFlag,setBoardRowFlag] = useState(false);
    // 페이지별 댓글 목록들
    const [replyRows,setReplyRows] = useState({
        boardRow:[],
        shortsRow:[],
        trollRow:[],
        trollApplyRow:[],
    });
    const [replyRowFlag,setReplyRowFlag] = useState(false);
    // 마이페이지 신고 목록들
    const [reportRows,setReportRows] = useState([]);
    const [reportRowFlag,setReportRowFlag] = useState(false);
    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686";

    //회원정보 가져오기 fetch
    const userInfoFetch = async () =>{
        try {
            const response = await fetch(API_URL+"/user", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            setUserInfo(json);
        } catch (error) {
            console.error('사용자 정보를 불러오는 중 오류 발생:', error);
        }
    };

    //내가 쓴 자게 조회
    const boardFetch = async () =>{
        const res = await fetch(API_URL+"/board/bulletin/my",{
            method : "GET",
            headers: { 'Authorization': `Bearer ${token}`},
        })
        const json = await res.json()
        console.log('json.board')
        console.log(json.board)
        if (json.board !== null){
            const updatedRows = json.board.map((row,index) => ({ ...row, id: index+1 }));
            setBoardRows(prevState => ({
                ...prevState,
                boardRow: updatedRows
            }))
        }
    }
    // 자유게시판 댓글 조회
    const boardReplyFetch = async () =>{
        const res = await fetch(API_URL+"/board/bulletin/detail/reply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()

        if (json.myReply !== null){
            const updatedRows = json.myReply.map((row,index) => ({ ...row, id: index+1 }));
            setReplyRows(prevState => ({
                ...prevState,
                boardRow:updatedRows
            }));
        }
    }

    // 내가 쓴 쇼츠 게시판 조회
    const shortsFetch = async () =>{
        const res = await fetch(API_URL+"/api/shorts/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.myshorts !== null){
            const updatedRows = json.myshorts.map((row,index) => ({ ...row, id: index+1 }));
            setBoardRows(prevState => ({
                ...prevState,
                shortsRow: updatedRows
            }))
        }
    }
    //쇼츠 댓글 가져오기
    const shortsReplyFetch = async () =>{
        const res = await fetch(API_URL+"/api/shorts/reply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.myreplys !== null){
            const updatedRows = json.myreplys.map((row,index) => ({ ...row, id: index+1 }));
            setReplyRows(prevState => ({
                ...prevState,
                shortsRow:updatedRows
            }));
        }
    }
// 내가 쓴 트롤 사형 지원 게시판 조회
    const applyFetch = async () =>{
        const res = await fetch(API_URL+"/troll/apply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()

        if (json.boardApply !== null){
            const updatedRows = json.boardApply.map((row,index) => ({ ...row, id: index+1 }));
            setBoardRows(prevState => ({
                ...prevState,
                trollApplyRow: updatedRows
            }))
        }
    }
    //트롤 사형 지원쪽 댓글 가져오기
    const applyReplyFetch = async () =>{
        const res = await fetch(API_URL+"/troll/apply/reply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.reply !== null){
            const updatedRows = json.reply.map((row,index) => ({ ...row, id: index+1 }));
            setReplyRows(prevState => ({
                ...prevState,
                trollApplyRow:updatedRows
            }));
        }
    }

    //트롤 사형 게시글 가져오기
    const rulingBoardFetch = async () =>{
        const res = await fetch(API_URL+"/troll/ruling/board/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        console.log(`트롤 json`)
        console.log(json)
        if (json.rulingList!== null){
            const updatedRows = json.rulingList.map((row,index) => ({ ...row, id: index+1 }));
            setBoardRows(prevState => ({
                ...prevState,
                trollRow: updatedRows
            }))
        }
    }
    //트롤 사형 댓글 가져오기
    const rulingReplyFetch = async () =>{
        const res = await fetch(API_URL+"/troll/ruling/reply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.reply !== null){
            const updatedRows = json.reply.map((row,index) => ({ ...row, id: index+1 }));
            setReplyRows(prevState => ({
                ...prevState,
                trollRow:updatedRows
            }));
        }
    }

    const changeActivity = (key,value) => {
        setMyActivity({
            ... myActivity,
            [key] : value
        })
    }
    //하위 컴포넌트에서 userInfo변경
    const changeUser = (user) =>{
        setUserInfo(user)
    }
    //하위 컴포넌트에서 type 변경
    const changeType = (type)=>{
        setPageType(type)
    }

    useEffect(() => {

        userInfoFetch();

        boardFetch()
        applyFetch();
        shortsFetch();
        rulingBoardFetch()

        boardReplyFetch();
        applyReplyFetch();
        shortsReplyFetch();
        rulingReplyFetch();

    }, []);
    return (
        <div className="mypage">
            <MypageSideMenu changeType={changeType} />
            {pageType === 1 && <MyPageProfile userInfo={userInfo} myActivity={myActivity} />}
            {pageType === 2 && <MyInformation userInfo={userInfo} changeUser ={changeUser} />}
            {pageType === 3 && <MyActivityMain boardRows={boardRows} replyRows={replyRows} reportRows={reportRows} />}
        </div>
    );
};

export default MyPageTemplate;