import React from 'react';
import DetailSpellInfo from "./DetailSpellInfo";
import DetailRuneInfo from "./DetailRuneInfo";

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
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.championName}.png`}
                alt="c"
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
            <span>{
                (player.riotIdGameName + "#" + player.riotIdTagline).length > 10
                    ? (player.riotIdGameName + "#" + player.riotIdTagline).slice(0, 10) + '...'
                    : player.riotIdGameName + "#" + player.riotIdTagline
            }</span>
        </div>
    );
};

export default DetailPlayerInfo;