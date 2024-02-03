import React, {useState} from 'react';
import "../scss/RightContent.scss";
import DonutChart from "react-donut-chart";
import RecentGames from "./RecentGames";
import LoadingIndicator from "./LoadingIndicator";
import ButtonGroup from "./ButtonGroup";

const RightContent = ({recentGames, searchValue, spellData, itemData, runeData}) => {

    const topButtonData = [
        {id: 1, label: '종합'},
        {id: 2, label: '챔피언'},
        {id: 3, label: '인게임'},
    ];

    const gameModeButtonData = [
        {id: 1, label: '전체'},
        {id: 2, label: '솔로랭크'},
        {id: 3, label: '자유랭크'},
        {id: 4, label: '칼바람 나락'},
        {id: 5, label: '일반게임'},
    ];

    const [selectedTopButton, setSelectedTopButton] = useState(topButtonData[0].id);

    const handleTopButtonClick = (buttonId) => {
        setSelectedTopButton(buttonId);
    };

    const renderSubContent = () => {
        if (selectedTopButton === 1) {
            // Render content for 'Comprehensive'
            return (
                <div>
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
                        <ButtonGroup buttonData={gameModeButtonData}/>
                    </div>
                    {recentGames ? <RecentGames recentGames={recentGames} searchValue={searchValue} spellData={spellData}
                                                itemData={itemData} runeData={runeData}/> : <LoadingIndicator/>}
                </div>
            );
        } else if (selectedTopButton === 2) {
            // Render content for 'Champion'
            return (
                <div>
                    챔피언 누름?
                </div>
            );
        } else if (selectedTopButton === 3) {
            // Render content for 'In-Game'
            return (
                <div>
                    인게임누름?
                </div>
            );
        }
        // Default case or additional cases can be added as needed
        return null;
    };


    const winLateChart = {
        win: 10,
        defeat: 5
    };

    return (

        <div className={"right-content"}>
            <div className="view-menu">
                <ButtonGroup buttonData={topButtonData} onButtonClick={handleTopButtonClick}/>
            </div>
            <div className="conditional-rendering">
                {renderSubContent()}
            </div>
        </div>

    );
};

export default RightContent;