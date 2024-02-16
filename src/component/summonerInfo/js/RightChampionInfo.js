import {IoIosArrowDown} from "react-icons/io";
import {useEffect, useState} from "react";

const RightChampionInfo = ({
                               showDetailGameInfo,
                               filteredParticipants,
                               gameData
                           }) => {

    const moveToClickUserInfo = (riotIdGameName, riotIdTagline) => {
        window.location.assign(`http://localhost:3000/find/${riotIdGameName}/${riotIdTagline}`);
    };

    const teamOnePlayers = gameData.participants.filter(participant => participant.teamId === 100);
    const teamTwoPlayers = gameData.participants.filter(participant => participant.teamId === 200);
    return (
        <div className="right-champion-info">
            <div className="team-one">
                {teamOnePlayers.map((player, index) => (
                    <div className={"champion-name-image"} key={index}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.championName}.png`}
                            alt="c"
                            style={{width: "20px"}}
                            className={filteredParticipants.some(participant => participant.championName === player.championName) ? 'mine' : 'not-mine'}
                        />
                        <span
                            onClick={() => moveToClickUserInfo(player.riotIdGameName, player.riotIdTagline)}>
                        {
                            player.riotIdGameName.length > 6
                                ? `${player.riotIdGameName.substring(0, 6)}...`
                                : player.riotIdGameName
                        }
                        </span>
                    </div>
                ))}
            </div>
            <div className="team-two">
                {teamTwoPlayers.map((player, index) => (
                    <div className={"champion-name-image"} key={index}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.championName}.png`}
                            alt="c"
                            style={{width: "20px"}}
                            className={filteredParticipants.some(participant => participant.championName === player.championName) ? 'mine' : 'not-mine'}
                        />
                        <span
                            onClick={() => moveToClickUserInfo(player.riotIdGameName, player.riotIdTagline)}>
                        {
                            player.riotIdGameName.length > 6
                                ? `${player.riotIdGameName.substring(0, 6)}...`
                                : player.riotIdGameName
                        }
                        </span>
                    </div>
                ))}
            </div>
            <IoIosArrowDown size={30} onClick={showDetailGameInfo}/>
        </div>
    );
};

export default RightChampionInfo;