import React from 'react';
import "../scss/RankBoardData.scss"

const RankBoardData = ({ranking, currentPage, itemsPerPage, selectedValue, tier}) => {

    console.log(selectedValue);

    if (!ranking) {
        return <tbody className={'rank-tbody'}></tbody>;
    }
    const sortedRanking = ranking.slice().sort((a, b) => b.leaguePoints - a.leaguePoints);
    let startIndex;
    if(selectedValue === "CHALLENGER") {
        startIndex = (currentPage - 1) * itemsPerPage;
    } else if (selectedValue === "GRANDMASTER") {
        startIndex = (currentPage - 1) * itemsPerPage + 300;
    } else if (selectedValue === "MASTER") {
        startIndex = (currentPage - 1) * itemsPerPage + 1000;
    }


    return (
        <tbody className={'rank-tbody'}>
        {
            sortedRanking.map((data, index) => (
                <tr className={'rank-tr'} key={startIndex + index + 1} >
                    <td>{startIndex + index + 1}</td>
                    <td>{data.summonerName}</td>
                    <td>{tier}</td>
                    <td>{data.leaguePoints}</td>
                    <td>{data.wins}</td>
                    <td>{data.losses}</td>
                    <td>{(data.wins / (data.wins + data.losses) * 100).toFixed(2)}%</td>
                </tr>
            ))
        }
        </tbody>
    );
};

export default RankBoardData;