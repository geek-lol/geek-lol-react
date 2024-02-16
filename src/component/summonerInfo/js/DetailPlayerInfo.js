import React from 'react';
import DetailSpellInfo from "./DetailSpellInfo";
import DetailRuneInfo from "./DetailRuneInfo";
import {useNavigate} from "react-router-dom";

const capitalizeFirstLetter = (word) => {
    if (word === "FiddleSticks") {   // 기형적인 문자열이라 따로처리
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
        return word;
    }
}

const moveToSummoner = (riotIdGameName, riotIdTagline) => {
    window.location.assign(`http://localhost:3000/find/${riotIdGameName}/${riotIdTagline}`);
};

const DetailPlayerInfo = ({
                              player,
                              index,
                              team,
                              setViewFirstSpell,
                              setViewSecondSpell,
                              setViewMainRune,
                              setViewSubRune,
                              viewFirstSpell,
                              viewSecondSpell,
                              viewMainRune,
                              viewSubRune,
                              getSpellByKey,
                              getMainRuneById,
                              getSubRuneData
                          }) => {
    return (
        <div className={`detail-game-info-champion ${team}`} key={index}>
            <div className="detail-champion-spell-rune">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${capitalizeFirstLetter(player.championName)}.png`}
                    alt={`${player.championName}`}
                    style={{width: "40px"}}
                />
                <div className="detail-spell-container">
                    <DetailSpellInfo
                        spellKey={player.summoner1Id}
                        viewSpell={viewFirstSpell}
                        setViewSpell={setViewFirstSpell}
                        index={index}
                        getSpellByKey={getSpellByKey}
                    />
                    <DetailSpellInfo
                        spellKey={player.summoner2Id}
                        viewSpell={viewSecondSpell}
                        setViewSpell={setViewSecondSpell}
                        index={index}
                        getSpellByKey={getSpellByKey}
                    />
                </div>
                <div className="detail-rune-container">
                    <DetailRuneInfo
                        player={player}
                        viewMainRune={viewMainRune}
                        viewSubRune={viewSubRune}
                        setViewMainRune={setViewMainRune}
                        setViewSubRune={setViewSubRune}
                        index={index}
                        getMainRune={getMainRuneById}
                        getSubRune={getSubRuneData}
                    />
                </div>
            </div>
            <span onClick={() => moveToSummoner(player.riotIdGameName, player.riotIdTagline)} className={"detail-summoner-name"}>{
                (player.riotIdGameName + "#" + player.riotIdTagline).length > 10
                    ? (player.riotIdGameName + "#" + player.riotIdTagline).slice(0, 10) + '...'
                    : player.riotIdGameName + "#" + player.riotIdTagline
            }</span>
        </div>
    );
};

export default DetailPlayerInfo;