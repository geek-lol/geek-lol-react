import React, {useEffect, useState} from 'react';
import "../scss/RecentGames.scss";
import Game from "./Game";
import axios from "axios";
import {Button} from "@mui/material";
import LoadingIndicator from "./LoadingIndicator";

const RecentGames = ({recentGames, searchValue, spellData, itemData, runeData, getRecentGames, moreGame}) => {
    return (
        <div className="recentGames">
            {recentGames.map((game, index) => (
                <Game key={recentGames[index].info.matchId} gameKey={index} gameData={game}
                      searchValue={searchValue} spellData={spellData} itemData={itemData} runeData={runeData}/>
            ))}
            {
                moreGame ? <LoadingIndicator/>
                    : (
                        <button className="load-more-recent-game-data" onClick={getRecentGames}>
                            10게임 추가 검색
                        </button>
                    )
            }

        </div>
    );
};


export default RecentGames;