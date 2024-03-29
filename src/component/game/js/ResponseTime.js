import React, {useEffect, useState} from 'react';
import '../scss/ResponseTime.scss';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getCurrentLoginUser} from "../../../utils/login-util";
import axios from "axios";
import {formatDate} from "../../../utils/format-date";
import {RESGAME_RANK_URL} from "../../../config/host-config";
const ResponseTime = () => {

    let startTime; // 시작시간
    let endTime; // 끝나는 시간
    let responseTime; // 측정시간
    // 평균 반응 속도 구할 빈 배열
    let records = [];
    let timeoutId; // setTimeout 함수를 담을 변수;

    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);
    const tokenId = getCurrentLoginUser().userId;
    //요청 URL
    const API_URL = RESGAME_RANK_URL;

    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const [rankList,setRankList] = useState([]);
    const [myRank, setMyRank] = useState(null);
    const [myRankFlag, setRankFlag] = useState(false);

    const [isRendered, setIsRendered] = useState(false);

    //랭킹 조회하기
    async function fetchData(){
        const response = await axios.get(API_URL, {
            headers: {"content-type": "application/json"}
        })

        const data = await response.data.gameRankList;
        const updateList = data.map((rank, index)=>({...rank,rank:index+1}));
        const filter = updateList.filter(rank => rank.userId === tokenId);
        if (filter.length > 0){
            setMyRank(...filter);
        }
        setRankList(updateList);
        console.log('updata');
        console.log(updateList);
    }

    useEffect(() => {
        console.log(myRank);
    }, [myRank]);

    useEffect(() => {
       fetchData();
        const timer = setTimeout(() => {
            setIsRendered(true);
        }, 1000); // 1초 후에 렌더링

        return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거하여 메모리 누수
    }, []);

    // 게임 점수 DB저장 처리 fetch
    const addRank = async (score)=>{
        const payload = {
            score : `${score}`
        }
        const res = await fetch(API_URL,{
            method:"POST",
            headers : requestHeader,
            body : JSON.stringify(payload)
        })
        const json = await res.json();

        const updateList = json.gameRankList.map((rank, index)=>({...rank,rank:index+1}));
        const filter = updateList.filter(rank => rank.userId === tokenId);
        if (filter.length > 0){
            setMyRank(...filter);
        }
        setRankList(updateList);

    }
    // 게임 처리 함수
    function startClick(){
        console.log('start 함수 시작')
        const $screen = document.querySelector("#screen");
        const $result = document.querySelector("#result");

        if ($screen.classList.contains("waiting")) { //첫화면 or 성급한 화면
            $screen.classList.replace("waiting", "ready");
            $screen.textContent = "초록색이 되면 클릭하세요";
            timeoutId = setTimeout(() => {
                startTime = new Date();
                $screen.classList.replace("ready", "now");
                $screen.textContent = "클릭 하세요!";
            }, Math.floor(Math.random() * 1000) + 2000);

        } else if ($screen.classList.contains("ready")) {
            clearTimeout(timeoutId);
            $screen.textContent = '너무 성급합니다! 초록화면이 되면 클릭해주세요.처음부터 다시 시작합니다.';
            records=[];
            $result.innerHTML=``;
            document.getElementById('gameCount').textContent = `진행도 : 0/5`;
            $screen.classList.replace('ready', 'waiting');

        } else if ($screen.classList.contains("now")) { // 초록일때 클릭시
            // console.log(records)
            endTime = new Date();
            responseTime = endTime - startTime; // 측정시간
            records.push(responseTime)
            let Avg = records.reduce((acc, cur) => { return acc + cur; }, 0) / records.length; // 평균 반응 속도

            // 결과 누적 코드
            const $newResult = document.createElement('p');
            $newResult.textContent = `${records.length}차 테스트 : ` + responseTime + " ms"
            $result.appendChild($newResult);

            $screen.classList.replace("now", "waiting");
            $screen.textContent = "잠시만 기다리세요";
            document.getElementById('gameCount').textContent = `진행도 : ${records.length}/5`;
            gameLoading(1000,Avg)
        }

        //초록 화면 클릭 후 지정 초 동안 멈춤
        function gameLoading(s,Avg){
            setTimeout(()=>{
                if (records.length < 5){
                    startClick();
                }else{
                    if (token !== null){
                        addRank(Avg);
                    }
                    setRankFlag(!myRankFlag);
                    $screen.textContent = `당신의 평균속도 : ${Avg}`;
                    document.getElementById("testReset").classList.remove('non');
                }
            },s)
        }
    }
    // 게임 다시 하는 클릭 이벤트
    function resetButtonClickHandler(){
        const $screen = document.querySelector("#screen");
        const $result = document.querySelector("#result");

        records=[];
        $screen.textContent = "클릭해서 시작하세요!";
        $result.innerHTML=``;
        document.getElementById('gameCount').textContent = `진행도 : 0/5`;
        document.getElementById("testReset").classList.add('non');
    }

    if(!isRendered){
        return null;
    }
    return (
        <>
            <div className="res-wrapper"> </div>
            <div>
                <h1 className="game-title"> 반응 속도 테스트 </h1>
                <div id="gameCount" style={{color:"white",marginBottom:"20px"}}>진행도 : 0/5</div>
                {token === null && <div id="gameCount" style={{color:"white",marginBottom:"20px"}}>로그인해야 랭킹에 저장됩니다.</div>}
                <div className="game-main">
                    <div id="screen" className="waiting" onClick={startClick}>클릭해서 시작하세요</div>
                    <div id="result"></div>
                </div>
                <div id="testReset" className="btn-reset non" onClick={resetButtonClickHandler}>
                    <Button variant="contained">테스트 다시하기</Button>
                </div>
            </div>

            <TableContainer sx={{width:'65%', mx:'auto',mt:10,mb:30}} component={Paper}>
                <div className="rank-title"> 순위표 </div>

                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">순위</TableCell>
                            <TableCell align="left">닉네임(아이디)</TableCell>
                            <TableCell align="left">반응 속도</TableCell>
                            <TableCell align="left">날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myRank !==null && <TableRow sx={{border: '4px solid red'}}>
                        <TableCell align="center" component="th" scope="row">
                            {myRank.rank}
                        </TableCell>
                        <TableCell align="left">{`${myRank.userName}(${myRank.userId})`}</TableCell>
                        <TableCell align="left">{myRank.score}ms</TableCell>
                        <TableCell align="left">{formatDate(myRank.recordDate, null)}</TableCell>
                    </TableRow>}
                        {rankList.map((row) => (
                            <TableRow
                                key={row.gameId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.rank}
                                </TableCell>
                                <TableCell align="left">{`${row.userName}(${row.userId})`}</TableCell>
                                <TableCell align="left">{row.score}ms</TableCell>
                                <TableCell align="left">{formatDate(row.recordDate,null)}</TableCell>
                            </TableRow>
                        ))}
                        {rankList.length=== 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan={4}>랭킹 정보가 없습니다. 플레이하세요!</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ResponseTime;