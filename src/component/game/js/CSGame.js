import React from 'react';
import '../scss/CSGame.scss';

const CSGame = () => {
    function playerMoveHandler(e) {
            // 여기서의 이벤트는 클릭 이벤트 객체
        const sidePosition = {
            X: Math.floor(e.target.getBoundingClientRect().left + window.pageXOffset),
            Y: Math.floor(e.target.getBoundingClientRect().top + window.pageYOffset),
        };

        // 클릭한 엘리먼트의 절대좌표
        // .getBoundingClientRect().left 뷰포트 기준 X값 top은 Y 값
        // pageOffset은 오프셋으로부터 계산한 스크롤 가로길이

        const clickPosition = {
            X: Math.floor(e.clientX) + window.pageXOffset,
            Y: Math.floor(e.clientY) + window.pageYOffset,
        };
        // 클릭 이벤트의 좌표 어차피 서로 뺄거라 기준만 맞추면 됨
        const ratio = {
            X: clickPosition.X - sidePosition.X,
            Y: clickPosition.Y - sidePosition.Y,
        };

        document.querySelector('.player').style.transition = 'left 5s, top 5s';
        document.querySelector('.player').style.left = `${ratio.X}px`;
        document.querySelector('.player').style.top = `${ratio.Y}px`;
        console.log(ratio)

    }

    return (
        <div className={'screen-back'} onClick={playerMoveHandler}>
            <div className={'player'}></div>
            <div className={'minion'}></div>
        </div>
    );
};

export default CSGame;
