import "../scss/Game.scss";
import {useState} from "react";
import DetailPlayerInfo from "./DetailPlayerInfo";
import {gameTimeFunc, longToDate, secondsToMinutesAndSeconds} from "../functions/gameTimeFunc";
import PlayerSearchInfo from "./PlayerSearchInfo";
import RightChampionInfo from "./RightChampionInfo";


const Game = ({gameData, searchValue, spellData, key, itemData, runeData}) => {


    const filteredParticipants = gameData.participants.filter(participant =>
        participant.riotIdGameName.toLowerCase().replace(/ /g, "").includes(searchValue.toLowerCase().replace(/ /g, ""))
    );

    const teamOnePlayers = gameData.participants.filter(participant => participant.teamId === 100);
    const teamTwoPlayers = gameData.participants.filter(participant => participant.teamId === 200);

    const [gameTimestamp, setGameTimestamp] = useState(false);

    const getSubRuneData = (id) => {
        for (const category of runeData) {
            if (category.id === id) {
                return category;
            }
        }
        return null;
    };

    const getMainRuneById = (id) => {
        for (const category of runeData) {
            if (category.slots) {
                for (const slot of category.slots) {
                    if (slot.runes) {
                        for (const rune of slot.runes) {
                            if (rune.id === id) {
                                return rune;
                            }
                        }
                    }
                }
            }
        }
        return null;
    };


    const getSpellByKey = (key) => {
        for (const summonerSpell in spellData.data) {
            if (spellData.data.hasOwnProperty(summonerSpell) && spellData.data[summonerSpell].key === key) {
                return spellData.data[summonerSpell];
            }
        }
        return null;
    };

    const [isViewDetailGameInfo, setIsViewDetailGameInfo] = useState(false);
    const showDetailGameInfo = e => {
        setIsViewDetailGameInfo(!isViewDetailGameInfo);
    };

    const maxParticipantCount = 5; // Maximum participant count
    const [viewTeamBlueFirstSpell, setViewTeamBlueFirstSpell] = useState(Array(maxParticipantCount).fill(false));
    const [viewTeamBlueSecondSpell, setViewTeamBlueSecondSpell] = useState(Array(maxParticipantCount).fill(false));

    const [viewTeamRedFirstSpell, setViewTeamRedFirstSpell] = useState(Array(maxParticipantCount).fill(false));
    const [viewTeamRedSecondSpell, setViewTeamRedSecondSpell] = useState(Array(maxParticipantCount).fill(false));

    const [viewTeamBlueMainRune, setViewTeamBlueMainRune] = useState(Array(maxParticipantCount).fill(false));
    const [viewTeamBlueSubRune, setViewTeamBlueSubRune] = useState(Array(maxParticipantCount).fill(false));

    const [viewTeamRedMainRune, setViewTeamRedMainRune] = useState(Array(maxParticipantCount).fill(false));
    const [viewTeamRedSubRune, setViewTeamRedSubRune] = useState(Array(maxParticipantCount).fill(false));


    return (
        filteredParticipants.map((player, index) => (
            <>
                <div className={`game ${player.win ? 'win' : 'lose'}`}>
                    <div className={`result-indicator ${player.win ? 'win' : 'lose'}`}></div>
                    <div className="game-info-real">
                        <div className="game-info" key={key}>
                            {
                                <div className={"game-info-container"}>
                                    <span className={`game-type ${player.win ? 'win' : 'lose'}`}>
                                        {(() => {
                                            switch (gameData.info.queueId) {
                                                case 420:
                                                    return '솔로랭크';
                                                case 430:
                                                    return '일반게임';
                                                case 440:
                                                    return '자유랭크';
                                                case 450:
                                                    return '칼바람 나락';
                                                default:
                                                    return '몰라요';
                                            }
                                        })()}
                                    </span>
                                    <div className="game-time">
                                        <div className={`game-timestamp ${gameTimestamp ? 'show' : ''}`}>
                                            <span>게임 시작 : {gameTimeFunc(gameData.info.gameStartTimestamp)}</span>
                                            <span>게임 종료 : {gameTimeFunc(gameData.info.gameEndTimestamp)}</span>
                                        </div>
                                        <span
                                            className={"game-end-time"}
                                            onMouseEnter={() => setGameTimestamp(true)}
                                            onMouseLeave={() => setGameTimestamp(false)}
                                        >
                                            {longToDate(gameData.info.gameEndTimestamp)}
                                        </span>
                                    </div>
                                    <div className="game-progress-time-outcome">
                                        <span
                                            className={`game-type ${player.win ? 'win' : 'lose'}`}>{player.win ? "승리" : "패배"}</span>
                                        <span
                                            className={"game-progress-time"}> {secondsToMinutesAndSeconds(gameData.info.gameDuration)} </span>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="searchInfo">
                            {filteredParticipants.map((player, index) => (
                                <PlayerSearchInfo
                                    key={index}
                                    player={player}
                                    itemData={itemData}
                                    getSpellByKey={getSpellByKey}
                                    getSubRuneData={getSubRuneData}
                                    getMainRuneById={getMainRuneById}
                                    runeData={runeData}
                                />
                            ))}
                        </div>
                    </div>
                    <RightChampionInfo
                        showDetailGameInfo={showDetailGameInfo}
                        filteredParticipants={filteredParticipants}
                        gameData={gameData}
                    />

                </div>
                <div className={`detail-game-info ${isViewDetailGameInfo ? 'show' : ''}`}>
                    {/* 팀1 */}
                    <table>
                        <colgroup>
                            <col width={"33%"}/>
                            <col width={"12%"}/>
                            <col width={"8%"}/>
                            <col width={"7%"}/>
                            <col width={"7%"}/>
                            <col width={"22%"}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>{teamOnePlayers[0].teamId === 100 ? '블루팀 ' : '레드팀 '}{teamOnePlayers[0].win ? '승리' : '패배'}</th>
                            <th>KDA</th>
                            <th>피해량</th>
                            <th>CS</th>
                            <th>와드</th>
                            <th>아이템</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teamOnePlayers.map((player, index) => (
                            <tr>
                                <td>
                                    <DetailPlayerInfo
                                        player={player}
                                        index={index}
                                        team='team-blue'
                                        setViewFirstSpell={setViewTeamBlueFirstSpell}
                                        setViewSecondSpell={setViewTeamBlueSecondSpell}
                                        setViewMainRune={setViewTeamBlueMainRune}
                                        setViewSubRune={setViewTeamBlueSubRune}
                                        viewFirstSpell={viewTeamBlueFirstSpell}
                                        viewSecondSpell={viewTeamBlueSecondSpell}
                                        viewMainRune={viewTeamBlueMainRune}
                                        viewSubRune={viewTeamBlueSubRune}
                                        getSubRuneData={getSubRuneData}
                                        getMainRuneById={getMainRuneById}
                                        getSpellByKey={getSpellByKey}
                                    />
                                </td>
                                <td className={"detail-kda-td"}>
                                    {player.kills} / {player.deaths} / {player.assists}
                                </td>
                                <td>
                                    {player.totalDamageDealtToChampions}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* 팀2 */}
                    <table>
                        <colgroup>
                            <col width={"33%"}/>
                            <col width={"12%"}/>
                            <col width={"8%"}/>
                            <col width={"7%"}/>
                            <col width={"7%"}/>
                            <col width={"22%"}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>{teamTwoPlayers[0].teamId === 200 ? '레드팀 ' : '블루팀 '} {teamTwoPlayers[0].win ? '승리' : '패배'}</th>
                            <th>KDA</th>
                            <th>피해량</th>
                            <th>CS</th>
                            <th>와드</th>
                            <th>아이템</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>
                                {teamTwoPlayers.map((player, index) => (
                                    <DetailPlayerInfo
                                        player={player}
                                        index={index}
                                        team='team-red'
                                        setViewFirstSpell={setViewTeamRedFirstSpell}
                                        setViewSecondSpell={setViewTeamRedSecondSpell}
                                        setViewMainRune={setViewTeamRedMainRune}
                                        setViewSubRune={setViewTeamRedSubRune}
                                        viewFirstSpell={viewTeamRedFirstSpell}
                                        viewSecondSpell={viewTeamRedSecondSpell}
                                        viewMainRune={viewTeamRedMainRune}
                                        viewSubRune={viewTeamRedSubRune}
                                        getSubRuneData={getSubRuneData}
                                        getMainRuneById={getMainRuneById}
                                        getSpellByKey={getSpellByKey}
                                    />
                                ))}
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </>
        ))
    );
};

export default Game;