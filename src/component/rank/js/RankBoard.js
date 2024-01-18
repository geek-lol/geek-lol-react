import React from 'react';
import RankBoardData from "./RankBoardData";
import "../scss/RankBoard.scss"

const RankBoard = () => {
    return (
        <>
            <thead>
                <tr>
                    <th>순위</th>
                    <th>소환사</th>
                    <th>티어</th>
                    <th>LP</th>
                    <th>승률</th>
                </tr>
            </thead>
            <tbody>
                <RankBoardData />
            </tbody>
        </>
    );
};

export default RankBoard;