import "../scss/Game.scss";
import {useState} from "react";
import DetailPlayerInfo from "./DetailPlayerInfo";
import {gameTimeFunc, longToDate, secondsToMinutesAndSeconds} from "../functions/gameTimeFunc";
import PlayerSearchInfo from "./PlayerSearchInfo";
import RightChampionInfo from "./RightChampionInfo";
import TeamInfoTable from "./TeamInfoTable";
import useStateForViewLayer from "./UseStateForViewLayer";

const Game = ({gameData, searchValue, spellData, key, itemData, runeData}) => {
    const maxParticipantCount = 5; // Maximum participant count

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


    const [viewTeamBlueFirstSpell, setViewTeamBlueFirstSpell, viewTeamBlueSecondSpell, setViewTeamBlueSecondSpell, viewTeamBlueMainRune, setViewTeamBlueMainRune, viewTeamBlueSubRune, setViewTeamBlueSubRune] = useStateForViewLayer(maxParticipantCount);
    const [viewTeamRedFirstSpell, setViewTeamRedFirstSpell, viewTeamRedSecondSpell, setViewTeamRedSecondSpell, viewTeamRedMainRune, setViewTeamRedMainRune, viewTeamRedSubRune, setViewTeamRedSubRune] = useStateForViewLayer(maxParticipantCount);

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
                                                case 440:
                                                    return '자유랭크';
                                                case 450:
                                                    return '칼바람 나락';
                                                case 490:
                                                    return '일반게임';
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
                    <TeamInfoTable
                        teamPlayers={teamOnePlayers}
                        teamColor="team-blue"
                        gameMode={gameData.info.gameMode}
                        getSubRuneData={getSubRuneData}
                        getMainRuneById={getMainRuneById}
                        getSpellByKey={getSpellByKey}
                        viewFirstSpell={viewTeamBlueFirstSpell}
                        setViewFirstSpell={setViewTeamBlueFirstSpell}
                        viewSecondSpell={viewTeamBlueSecondSpell}
                        setViewSecondSpell={setViewTeamBlueSecondSpell}
                        viewMainRune={viewTeamBlueMainRune}
                        setViewMainRune={setViewTeamBlueMainRune}
                        viewSubRune={viewTeamBlueSubRune}
                        setViewSubRune={setViewTeamBlueSubRune}
                    />
                    <TeamInfoTable
                        teamPlayers={teamTwoPlayers}
                        teamColor="team-red"
                        gameMode={gameData.info.gameMode}
                        getSubRuneData={getSubRuneData}
                        getMainRuneById={getMainRuneById}
                        getSpellByKey={getSpellByKey}
                        viewFirstSpell={viewTeamRedFirstSpell}
                        setViewFirstSpell={setViewTeamRedFirstSpell}
                        viewSecondSpell={viewTeamRedSecondSpell}
                        setViewSecondSpell={setViewTeamRedSecondSpell}
                        viewMainRune={viewTeamRedMainRune}
                        setViewMainRune={setViewTeamRedMainRune}
                        viewSubRune={viewTeamRedSubRune}
                        setViewSubRune={setViewTeamRedSubRune}
                    />
                </div>
            </>
        ))
    );
};

export default Game;