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
    // 마이페이지 게시글 목록들
    const [boardRows,setBoardRows] = useState([]);
    const [boardRowFlag,setBoardRowFlag] = useState(false);
    // 마이페이지 댓글 목록들
    const [replyRows,setReplyRows] = useState([]);
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
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()

        if (json.board){
            setBoardRows(prevState => [
                ...prevState,
                ...json.board
            ]);
        }
    }

    // 내가 쓴 트롤 사형 게시판 조회
    const applyFetch = async () =>{
        const res = await fetch(API_URL+"/troll/apply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.boardApply !== null){
            setBoardRows(prevState => [
                ...prevState, ...json.boardApply
            ]);
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
            setBoardRows(prevState => [
                ...prevState, ...json.myshorts
            ]);
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
            setReplyRows(prevState => [
                ...prevState, ...json.reply
            ]);
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
            setReplyRows(prevState => [
                ...prevState, ...json.reply
            ]);
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
            setReplyRows(prevState => [
                ...prevState,...json.myreplys]);
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
        const updatedRows = boardRows.map((row,index) => ({ ...row, id: index }));
        setBoardRows(updatedRows);

        console.log(`updatedRows`);
        console.log(updatedRows);

       changeActivity('boards',updatedRows.length)
    }, [boardRowFlag]);

    useEffect(() => {
        const updatedRows = replyRows.map((row,index) => ({ ...row, id: index }));
        setReplyRows(updatedRows);

        changeActivity('comments',updatedRows.length)
    }, [replyRowFlag]);

    useEffect(() => {
        console.log('myActivity')
        console.log(myActivity)
    }, [myActivity]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await applyFetch();
                await shortsFetch();
                setBoardRowFlag(!boardRowFlag);

                await applyReplyFetch();
                await shortsReplyFetch();
                await rulingReplyFetch();
                setReplyRowFlag(!replyRowFlag);
            } catch (error) {
                console.error("Error during fetchData:", error);
                // 에러를 처리할 수 있음
            }
        };
        userInfoFetch();
        fetchData(); // fetchData 함수 호출

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