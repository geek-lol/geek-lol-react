import React, {useEffect, useState} from 'react';
import "../scss/RightContent.scss";
import RecentGames from "./RecentGames";
import LoadingIndicator from "./LoadingIndicator";
import ButtonGroup from "./ButtonGroup";
import {gameDateFunc, gameTimeFunc} from "../functions/gameTimeFunc";
import axios from "axios";
import {viewGameMode} from "../functions/gameModeFunc";
import {getSpellByKey} from "../functions/getGameDataFunc";
import {getMainRuneById, getSubRuneData} from "../functions/getRuneFunc";
import "../scss/MasteryTable.scss";
import {RxCross2} from "react-icons/rx";
import {CiCircleCheck, CiCircleRemove} from "react-icons/ci";
import {ALL_CHAMPION_MASTERY_URL, REALTIME_GAME_URL} from "../../../config/host-config";

const RightContent = ({
                          recentGames,
                          searchValue,
                          spellData,
                          itemData,
                          runeData,
                          championMastery,
                          championData,
                          getRecentGames,
                          moreGame,
                          tag
                      }) => {

    // console.log(championData);
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

    // const getMainRuneById = (id) => {
    //     for (const category of runeData) {
    //         if (category.slots) {
    //             for (const slot of category.slots) {
    //                 if (slot.runes) {
    //                     for (const rune of slot.runes) {
    //                         if (rune.id === id) {
    //                             return rune;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return null;
    // };

    const getChampionInfo = (key) => {
        for (let championName in championData.data) {
            if (championData.data.hasOwnProperty(championName)) {
                const champion = championData.data[championName];
                if (champion.key === key) {
                    return champion;
                }
            }
        }
    }

    const levelImages = [
        process.env.PUBLIC_URL + "/mastery/level0.webp",
        process.env.PUBLIC_URL + "/mastery/level1.webp",
        process.env.PUBLIC_URL + "/mastery/level2.webp",
        process.env.PUBLIC_URL + "/mastery/level3.webp",
        process.env.PUBLIC_URL + "/mastery/level4.webp",
        process.env.PUBLIC_URL + "/mastery/level5.webp",
        process.env.PUBLIC_URL + "/mastery/level6.webp",
        process.env.PUBLIC_URL + "/mastery/level7.webp"
    ];

    const [currentGame, setCurrentGame] = useState(null);

    const getRealtimeGame = async () => {
        const response = await axios.get(REALTIME_GAME_URL);

        if (response.status === 200 && response.data !== "" && response.data.gameId !== currentGame) { // Only update if there's a change
            setCurrentGame(response.data);
            console.log(response.data)
        } else {
            setCurrentGame(null);
        }
    };

    const [allChampionMastery, setAllChampionMastery] = useState(null)
    const getAllChampionMastery = async () => {

        const response = await axios.get(ALL_CHAMPION_MASTERY_URL);

        if (response.status === 200 && response.data !== "") {
            setAllChampionMastery(response.data);
            console.log(response.data);
        } else {
            setAllChampionMastery(null);
        }
    };

    const [showCurrentGameChampion0, setShowCurrentGameChampion0] = useState(false);
    const [showCurrentGameChampion1, setShowCurrentGameChampion1] = useState(false);

    const [showCurrentGameChampion3, setShowCurrentGameChampion3] = useState(false);
    const [showCurrentGameChampion4, setShowCurrentGameChampion4] = useState(false);
    const [currentChampionIndex, setCurrentChampionIndex] = useState(-1);

    const [showSpellDescription1, setShowSpellDescription1] = useState(false);
    const [showSpellDescription2, setShowSpellDescription2] = useState(false);
    const [showSpellDescription3, setShowSpellDescription3] = useState(false);
    const [showSpellDescription4, setShowSpellDescription4] = useState(false);

    const [showRuneDescription1, setShowRuneDescription1] = useState(false);
    const [showRuneDescription2, setShowRuneDescription2] = useState(false);
    const [showRuneDescription3, setShowRuneDescription3] = useState(false);
    const [showRuneDescription4, setShowRuneDescription4] = useState(false);


    const renderSubContent = () => {
        if (selectedTopButton === 1) {
            return (
                <div>
                    <div className="sub-content">
                        <div className="sub-content-inner">
                            {championMastery && championMastery.map(item => (
                                <div key={item.championId} className={"mastery-container"}>
                                    <p style={{
                                        textAlign: "center",
                                        fontSize: "20px"
                                    }}>{getChampionInfo(item.championId.toString()).name}</p>
                                    <div className="champion-mastery-image">
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(item.championId.toString()).image.full}`}
                                            alt={`${getChampionInfo(item.championId.toString()).name}`}
                                            width={50}
                                            className={"mastery-champion-image"}
                                        />
                                        <img src={levelImages[item.championLevel]} alt={`Level ${item.championLevel}`}
                                             width={50}/>
                                    </div>
                                    <p>숙련도 점수 : {item.championPoints.toLocaleString()}</p>
                                    <p>마지막 플레이 : {gameDateFunc(item.lastPlayTime)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*<div className="game-mode">*/}
                    {/*    <ButtonGroup buttonData={gameModeButtonData}/>*/}
                    {/*</div>*/}
                    {recentGames ?
                        <RecentGames recentGames={recentGames} searchValue={searchValue}
                                     spellData={spellData}
                                     itemData={itemData} runeData={runeData} getRecentGames={getRecentGames}
                                     moreGame={moreGame}/> :
                        <LoadingIndicator/>
                    }
                </div>
            );
        } else if (selectedTopButton === 2) {
            if (allChampionMastery) {
                return (
                    <div className={"all-mastery-container"}>
                        <table className={"champion-mastery-table"}>
                            <colgroup>
                                <col width={"10%"}/>
                                <col width={"20%"}/>
                                <col width={"20%"}/>
                                <col width={"10%"}/>
                                <col width={"10%"}/>
                                <col width={"30%"}/>
                            </colgroup>
                            <thead className={"champion-mastery-thead"}>
                            <tr className={"champion-mastery-thead-tr"}>
                                <th className={"champion-mastery-thead-tr-th"}>번호</th>
                                <th className={"champion-mastery-thead-tr-th"}>챔피언</th>
                                <th className={"champion-mastery-thead-tr-th"}>점수</th>
                                <th className={"champion-mastery-thead-tr-th"}>레벨</th>
                                <th className={"champion-mastery-thead-tr-th"}>상자획득</th>
                                <th className={"champion-mastery-thead-tr-th"}>마지막 플레이</th>
                            </tr>
                            </thead>
                            <tbody className={"champion-mastery-tbody"}>
                            {allChampionMastery.map((data, index) => (
                                <tr className={"champion-mastery-tbody-tr"}>
                                    <td className={"champion-mastery-tbody-tr-td"}> {index + 1} </td>
                                    <td className={"champion-mastery-tbody-tr-td"}>
                                        <div className="champion-mastery-champion-image-container">
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(data.championId.toString()).image.full}`}
                                                alt={`${getChampionInfo(data.championId.toString()).name}`}/>
                                            <span>{getChampionInfo(data.championId.toString()).name}</span>
                                        </div>
                                    </td>
                                    <td className={"champion-mastery-tbody-tr-td"}> {data.championPoints.toLocaleString()} </td>
                                    <td className={"champion-mastery-tbody-tr-td"}>
                                        <div className="champion-mastery-image-container">
                                            <img src={levelImages[data.championLevel]}
                                                 alt={`Mastery Level ${data.championLevel}`} width={63.27}/>
                                            <span>Level.{data.championLevel}</span>
                                        </div>
                                    </td>
                                    <td className={"champion-mastery-tbody-tr-td"}> {data.chestGranted ?
                                        <CiCircleCheck size={40} color={"green"}/> :
                                        <CiCircleRemove size={40} color={"red"}/>} </td>
                                    <td className={"champion-mastery-tbody-tr-td"}> {gameDateFunc(data.lastPlayTime)} </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <p>데이터가 없습니다?</p>
                )
            }
        } else if (selectedTopButton === 3) {
            if (currentGame) {

                const teamsData = {
                    100: [],
                    200: []
                };
                const bannedChampion = {
                    100: [],
                    200: []
                };
                currentGame.participants.forEach((gameInfo) => {
                    teamsData[gameInfo.teamId].push(gameInfo);
                });
                currentGame.bannedChampions.forEach((champ) => {
                    bannedChampion[champ.teamId].push(champ);
                })


                return (
                    <div className={"current-game-container"}>
                        <div className="current-game-info">
                            <p>{viewGameMode(currentGame.gameQueueConfigId)}</p> |
                            <p>{(Math.floor(currentGame.gameLength / 60)).toString().padStart(2, "0")}분 {(currentGame.gameLength % 60).toString().padStart(2, "0")}초</p> |
                            <p>{currentGame.gameMode === "CLASSIC" ? "소환사의 협곡" : currentGame.gameMode === "ARAM" ? "칼바람 나락" : "몰라"}</p>
                        </div>
                        <div className="current-game-description">
                            <div className="current-game-banned-champions">
                                <div className="current-game-team-one-banned-champions">
                                    {
                                        bannedChampion[100].map((champion, index) => (
                                            champion.championId === -1 ?
                                                <img
                                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/x-icon.png`}
                                                    alt="no ban" width={30}/>
                                                :
                                                <div>
                                                    <div
                                                        className={`current-game-banned-champion-name ${showCurrentGameChampion0 && currentChampionIndex === index ? "show" : ""}`}>{getChampionInfo(champion.championId.toString()).name}</div>

                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(champion.championId.toString()).image.full}`}
                                                        alt={`${getChampionInfo(champion.championId.toString()).name}`}
                                                        width={30}
                                                        onMouseEnter={() => {
                                                            setCurrentChampionIndex(index);
                                                            setShowCurrentGameChampion0(true);
                                                        }}
                                                        onMouseLeave={() => setShowCurrentGameChampion0(false)}
                                                    />
                                                </div>
                                        ))
                                    }
                                </div>
                                <p>금지</p>
                                <div className="current-game-team-two-banned-champions">
                                    {
                                        bannedChampion[200].map((champion, index) => (
                                            champion.championId === -1 ?
                                                <img
                                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/x-icon.png`}
                                                    alt="no ban" width={30}/>
                                                :
                                                <div>
                                                    <div
                                                        className={`current-game-banned-champion-name ${showCurrentGameChampion1 && currentChampionIndex === index ? "show" : ""}`}>{getChampionInfo(champion.championId.toString()).name}</div>

                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(champion.championId.toString()).image.full}`}
                                                        alt={`${getChampionInfo(champion.championId.toString()).name}`}
                                                        width={30}
                                                        onMouseEnter={() => {
                                                            setCurrentChampionIndex(index);
                                                            setShowCurrentGameChampion1(true);
                                                        }}
                                                        onMouseLeave={() => setShowCurrentGameChampion1(false)}
                                                    />
                                                </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="current-game-all-summoner">
                            <div className="current-game-summoner-container cur-team1">
                                {teamsData[100].map((gameInfo, index) => (
                                    <div key={index} className={`current-summoner ${index}`}>
                                        <div className="current-game-summner-info">
                                            <p onClick={() => gameInfo.tagLine === "KR1" ? window.location.assign(`/find/${gameInfo.summonerName}/${gameInfo.tagLine}`) : window.location.assign(`/find/${gameInfo.gameName}/${gameInfo.tagLine}`)}>{gameInfo.tagLine === "KR1" ? gameInfo.summonerName : gameInfo.gameName}#{gameInfo.tagLine}</p>
                                        </div>
                                        <div className="current-game-rune-container">
                                            <div
                                                className={`current-game-rune-description ${showRuneDescription1 && currentChampionIndex === index ? "show" : ""}`}>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: `${getMainRuneById(gameInfo.perks.perkIds[0], runeData).name} <hr/> ${getMainRuneById(gameInfo.perks.perkIds[0], runeData).longDesc}`}}></span>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/img/${getMainRuneById(gameInfo.perks.perkIds[0], runeData).icon}`}
                                                alt="dd"
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowRuneDescription1(true);
                                                }}
                                                onMouseLeave={() => setShowRuneDescription1(false)}
                                            />
                                            <div
                                                className={`current-game-rune-description ${showRuneDescription2 && currentChampionIndex === index ? "show" : ""}`}>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: `${getSubRuneData(gameInfo.perks.perkSubStyle, runeData).name}`}}></span>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/img/${getSubRuneData(gameInfo.perks.perkSubStyle, runeData).icon}`}
                                                alt="dd" width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowRuneDescription2(true);
                                                }}
                                                onMouseLeave={() => setShowRuneDescription2(false)}
                                            />
                                        </div>
                                        <div className="current-game-spell-container">
                                            <div
                                                className={`current-game-spell-description ${showSpellDescription1 && currentChampionIndex === index ? 'show' : ''}`}>
                                                <p>{getSpellByKey(gameInfo.spell1Id.toString(), spellData).name}</p>
                                                <hr></hr>
                                                <p>{getSpellByKey(gameInfo.spell1Id.toString(), spellData).description}</p>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey((gameInfo.spell1Id).toString(), spellData).image.full}`}
                                                alt={`${getSpellByKey((gameInfo.spell1Id).toString(), spellData).name}`}
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index)
                                                    setShowSpellDescription1(true)
                                                }}
                                                onMouseLeave={() => setShowSpellDescription1(false)}
                                            />
                                            <div
                                                className={`current-game-spell-description ${showSpellDescription2 && currentChampionIndex === index ? 'show' : ''}`}>
                                                <p>{getSpellByKey(gameInfo.spell2Id.toString(), spellData).name}</p>
                                                <hr></hr>
                                                <p>{getSpellByKey(gameInfo.spell2Id.toString(), spellData).description}</p>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey((gameInfo.spell2Id).toString(), spellData).image.full}`}
                                                alt={`${getSpellByKey((gameInfo.spell2Id).toString(), spellData).name}`}
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index)
                                                    setShowSpellDescription2(true)
                                                }}
                                                onMouseLeave={() => setShowSpellDescription2(false)}
                                            />
                                        </div>
                                        <div className="current-game-champion-info">
                                            <div
                                                className={`current-game-champion-name ${showCurrentGameChampion3 && currentChampionIndex === index ? "show" : ""}`}>{getChampionInfo(gameInfo.championId.toString()).name}</div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(gameInfo.championId.toString()).image.full}`}
                                                alt={`${getChampionInfo(gameInfo.championId.toString()).name}`}
                                                width={50}
                                                className={"mastery-champion-image"}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowCurrentGameChampion3(true);
                                                }}
                                                onMouseLeave={() => setShowCurrentGameChampion3(false)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="current-game-summoner-container cur-team2">
                                {teamsData[200].map((gameInfo, index) => (
                                    <div key={index} className={`current-summoner ${index}`}>
                                        <div className="current-game-champion-info">
                                            <div
                                                className={`current-game-champion-name ${showCurrentGameChampion4 && currentChampionIndex === index ? "show" : ""}`}>{getChampionInfo(gameInfo.championId.toString()).name}</div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${getChampionInfo(gameInfo.championId.toString()).image.full}`}
                                                alt={`${getChampionInfo(gameInfo.championId.toString()).name}`}
                                                width={50}
                                                className={"mastery-champion-image"}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowCurrentGameChampion4(true);
                                                }}
                                                onMouseLeave={() => setShowCurrentGameChampion4(false)}
                                            />
                                        </div>
                                        <div className="current-game-spell-container">
                                            <div
                                                className={`current-game-spell-description ${showSpellDescription3 && currentChampionIndex === index ? 'show' : ''}`}>
                                                <p>{getSpellByKey(gameInfo.spell1Id.toString(), spellData).name}</p>
                                                <hr></hr>
                                                <p>{getSpellByKey(gameInfo.spell1Id.toString(), spellData).description}</p>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey((gameInfo.spell1Id).toString(), spellData).image.full}`}
                                                alt={`${getSpellByKey((gameInfo.spell1Id).toString(), spellData).name}`}
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index)
                                                    setShowSpellDescription3(true)
                                                }}
                                                onMouseLeave={() => setShowSpellDescription3(false)}
                                            />
                                            <div
                                                className={`current-game-spell-description ${showSpellDescription4 && currentChampionIndex === index ? 'show' : ''}`}>
                                                <p>{getSpellByKey(gameInfo.spell2Id.toString(), spellData).name}</p>
                                                <hr></hr>
                                                <p>{getSpellByKey(gameInfo.spell2Id.toString(), spellData).description}</p>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey((gameInfo.spell2Id).toString(), spellData).image.full}`}
                                                alt={`${getSpellByKey((gameInfo.spell2Id).toString(), spellData).name}`}
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index)
                                                    setShowSpellDescription4(true)
                                                }}
                                                onMouseLeave={() => setShowSpellDescription4(false)}
                                            />
                                        </div>
                                        <div className="current-game-rune-container">
                                            <div
                                                className={`current-game-rune-description ${showRuneDescription3 && currentChampionIndex === index ? "show" : ""}`}>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: `${getMainRuneById(gameInfo.perks.perkIds[0], runeData).name} <hr/> ${getMainRuneById(gameInfo.perks.perkIds[0], runeData).longDesc}`}}></span>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/img/${getMainRuneById(gameInfo.perks.perkIds[0], runeData).icon}`}
                                                alt="dd"
                                                width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowRuneDescription3(true);
                                                }}
                                                onMouseLeave={() => setShowRuneDescription3(false)}
                                            />
                                            <div
                                                className={`current-game-rune-description ${showRuneDescription4 && currentChampionIndex === index ? "show" : ""}`}>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: `${getSubRuneData(gameInfo.perks.perkSubStyle, runeData).name}`}}></span>
                                            </div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/img/${getSubRuneData(gameInfo.perks.perkSubStyle, runeData).icon}`}
                                                alt="dd" width={25}
                                                onMouseEnter={() => {
                                                    setCurrentChampionIndex(index);
                                                    setShowRuneDescription4(true);
                                                }}
                                                onMouseLeave={() => setShowRuneDescription4(false)}
                                            />
                                        </div>
                                        <div className="current-game-summner-info">
                                            <p onClick={() => gameInfo.tagLine === "KR1" ? window.location.assign(`/find/${gameInfo.summonerName}/${gameInfo.tagLine}`) : window.location.assign(`/find/${gameInfo.gameName}/${gameInfo.tagLine}`)}>{gameInfo.tagLine === "KR1" ? gameInfo.summonerName : gameInfo.gameName}#{gameInfo.tagLine}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>{searchValue}#{tag}님은 현재 게임중이 아닙니다.</div>
                )
            }
        }
        return null;
    };

    useEffect(() => {

        selectedTopButton === 3 ? getRealtimeGame() : setCurrentGame(null);

        selectedTopButton === 2 ? getAllChampionMastery() : setAllChampionMastery(null);
    }, [selectedTopButton]);

    return (

        <div className={"right-content"}>
            <div className="view-menu">
                <ButtonGroup buttonData={topButtonData}
                             onButtonClick={handleTopButtonClick}/>
            </div>
            <div
                className={`conditional-rendering ${selectedTopButton === 1 ? "recent" : selectedTopButton === 2 ? "champion-mastery" : "current-game"}`}>
                {renderSubContent()}
            </div>
        </div>

    );
};

export default RightContent;