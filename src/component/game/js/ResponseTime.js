import React from 'react';
import '../scss/ResponseTime.scss';
import Button from '@mui/material/Button';
const ResponseTime = () => {

    let startTime; // 시작시간
    let endTime; // 끝나는 시간
    let responseTime; // 측정시간
    // 평균 반응 속도 구할 빈 배열
    let records = [];
    let timeoutId; // setTimeout 함수를 담을 변수;

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
    }

    return (
        <>  
            <div>
                <h1 className="game-title"> 반응 속도 테스트 </h1>
                <div id="gameCount">진행도 : 0/5</div>
                <div id="screen" className="waiting" onClick={startClick}>클릭해서 시작하세요</div>
                <div id="testReset" className="btn-reset non" onClick={resetButtonClickHandler}>
                    <Button variant="contained">테스트 다시하기</Button>
                </div>
                <div id="result"></div>
            </div>
            <table className="game-rank">
                <thead className="game-rank-head">
                    <tr className="game-rank-row">
                        <td className="game-rank-item">순위</td>
                        <td className="game-rank-item" >닉네임</td>
                        <td className="game-rank-item">반응 속도</td>
                        <td className="game-rank-item">날짜</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="game-rank-row">
                        <td className="game-rank-item">1</td>
                        <td className="game-rank-item">하이</td>
                        <td className="game-rank-item">2</td>
                        <td className="game-rank-item">2024-01-01 33:22:11</td>
                    </tr>
                </tbody>
            </table>
        </>
     
    );
};

export default ResponseTime;