import React, {useEffect, useState} from 'react';
import "../scss/RecentGames.scss";
import Game from "./Game";
import axios from "axios";
import {Button} from "@mui/material";

const RecentGames = ({recentGames, searchValue, spellData, itemData, runeData}) => {
    return (
        <div className="recentGames">
            {recentGames.map((game, index) => (
                <>
                    <Game key={recentGames[index].info.matchId} gameKey={index} gameData={game}
                          searchValue={searchValue} spellData={spellData} itemData={itemData} runeData={runeData}/>
                </>
            ))}
            <button className="load-more-recent-game-data">
                20게임 추가 검색
            </button>
        </div>
    );
};


export default RecentGames;