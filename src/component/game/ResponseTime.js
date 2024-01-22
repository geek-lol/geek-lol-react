import React from 'react';
import r from './ResponseTime.scss';
const ResponseTime = () => {

    let startTime; // 시작시간
    let endTime; // 끝나는 시간
    let responseTime; // 측정시간
    let records = []; // 평균 반응 속도 구할 빈 배열
    let timeoutId; // setTimeout 함수를 담을 변수

    // 게임 처리 함수
    const startClick = () =>{
        const screen = document.querySelector("#screen");
        const result = document.querySelector("#result");

        if (screen.classList.contains("waiting")) {
            screen.classList.replace("waiting", "ready");
            screen.textContent = "초록색이 되면 클릭하세요";
            timeoutId = setTimeout(() => {
                startTime = new Date();
                screen.classList.replace("ready", "now");
                screen.textContent = "클릭 하세요!";
            }, Math.floor(Math.random() * 1000) + 2000);

        } else if (screen.classList.contains("ready")) {
            clearTimeout(timeoutId);
            screen.textContent = '너무 성급합니다!';
            screen.classList.replace('ready', 'waiting');

        } else if (screen.classList.contains("now")) {
            endTime = new Date();
            responseTime = endTime - startTime; // 측정시간
            console.log(`start:${startTime} , end: ${endTime}, res: ${responseTime}`)
            records.push(responseTime);
            let Avg = records.reduce((acc, cur) => { return acc + cur; }, 0) / records.length; // 평균 반응 속도
            result.textContent = '현재 : ' + responseTime + " ms" + ' ' + '평균 속도 : ' + Avg;
            //   startTime = null;
            //   endTime = null; 여기서 null 이거 없어도 되지 않나?
            screen.classList.replace("now", "waiting");
            screen.textContent = "클릭해서 시작하세요";
        }
    }

    return (
        <div>
            <h1 className="game-title"> 반응 속도 테스트 </h1>
            <div id="screen" className="waiting" onClick={startClick}>클릭해서 시작하세요</div>
            <div id="result">
            </div>
        </div>
    );
};

export default ResponseTime;