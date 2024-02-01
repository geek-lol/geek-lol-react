import React, {useState} from 'react';
import "../scss/RightContent.scss";
import {Button} from "@mui/material";
import DonutChart from "react-donut-chart";
import RecentGames from "./RecentGames";
import LoadingIndicator from "./LoadingIndicator";
import axios from "axios";

const RightContent = ({recentGames, searchValue, spellData, itemData, runeData}) => {



    const winLateChart = {
        win: 2,
        defeat: 1
    };

    return (
        <div className={"right-content"}>
            <div className="view-menu">
                <div className="btn-box">
                    <button className={"select-btn clicked"}>종합</button>
                    <button className={"select-btn"}>챔피언</button>
                    <button className={"select-btn"}>인게임</button>
                </div>
            </div>
            <div className="sub-content">
                <div className="sub-content-inner">
                    <div className="win-late-chart">
                        <span className="win-late-description">88%</span>
                        <DonutChart data={[
                            {
                                label: "패배",
                                value: winLateChart.defeat,
                            },
                            {
                                label: "승리",
                                value: winLateChart.win
                            }
                        ]}
                                    colors={["#f76b8a", "#13D8F6"]}
                                    interactive={false}
                                    width={125}
                                    height={125}
                                    legend={false}
                                    strokeColor={"none"}
                                    innerRadius={0.5}
                        />
                    </div>
                    <div className="game-record-description">
                        <span>경기 수</span>
                        <div className="bottom-des">
                            <span className={"bottom-text total-count"}>8 게임</span>
                            <span className={"bottom-text count"}>7승 1패</span>
                        </div>
                    </div>
                    <div className="champion-win-late"> {/* column */}
                        <span className="champion-span">모스트 3 챔피언</span>
                        <div className="champion-des">
                            <div className="sub-champion">    {/* row */}
                                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Lucian.png"
                                     alt=""/>
                                <div className="champion-win-late-info-des">    {/* column*/}
                                    <span className="champion-win-late-des1">66.7%</span>
                                    <span className="champion-win-late-des2">6승 3패</span>
                                    <span className="champion-win-late-des3">2.41KDA</span>
                                </div>
                            </div>
                            <div className="sub-champion">    {/* row */}
                                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Varus.png"
                                     alt=""/>
                                <div className="champion-win-late-info-des">    {/* column*/}
                                    <span className="champion-win-late-des1">66.7%</span>
                                    <span className="champion-win-late-des2">6승 3패</span>
                                    <span className="champion-win-late-des3">2.41KDA</span>
                                </div>
                            </div>
                            <div className="sub-champion">    {/* row */}
                                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/MasterYi.png"
                                     alt=""/>
                                <div className="champion-win-late-info-des">    {/* column*/}
                                    <span className="champion-win-late-des1">66.7%</span>
                                    <span className="champion-win-late-des2">6승 3패</span>
                                    <span className="champion-win-late-des3">2.41KDA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="game-mode">
                <div className="btn-box">
                    <button className="all-game-btn select-btn clicked">전체</button>
                    <button className="solo-rank-btn select-btn">솔로랭크</button>
                    <button className="flex-rank-btn select-btn">자유랭크</button>
                    <button className="flex-rank-btn select-btn">칼바람 나락</button>
                    <button className="flex-rank-btn select-btn">일반게임</button>
                </div>
            </div>
            {recentGames ? <RecentGames recentGames={recentGames} searchValue={searchValue} spellData={spellData} itemData={itemData} runeData={runeData} /> : <LoadingIndicator/>}
        </div>
    );
};

export default RightContent;