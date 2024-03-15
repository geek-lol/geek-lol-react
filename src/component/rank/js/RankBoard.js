import React from 'react';
import RankBoardData from "./RankBoardData";
import "../scss/RankBoard.scss"

const RankBoard = ({ranking, currentPage, itemsPerPage, selectedValue, tier}) => {
    return (
        <table className={'rank-table'}>
            <thead>
                <tr className={'table'}>
                    <th>순위</th>
                    <th>소환사</th>
                    <th>티어</th>
                    <th>LP</th>
                    <th>승</th>
                    <th>패</th>
                    <th>승률</th>
                </tr>
            </thead>

            <RankBoardData ranking={ranking} currentPage={currentPage} itemsPerPage={itemsPerPage} selectedValue={selectedValue} tier={tier} />
        </table>

    );
};

export default RankBoard;