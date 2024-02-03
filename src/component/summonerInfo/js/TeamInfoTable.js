import React from 'react';
import DetailPlayerInfo from "./DetailPlayerInfo";

const TeamInfoTable = ({teamPlayers, teamColor, gameMode, getSubRuneData, getMainRuneById, getSpellByKey, viewFirstSpell, viewSecondSpell, viewMainRune, viewSubRune, setViewFirstSpell, setViewSecondSpell, setViewMainRune, setViewSubRune}) => {

    const multipleKills = (double, triple, quadra, penta) => {
        switch (true) {
            case penta >= 1:
                return "펜타킬";
            case quadra >= 1:
                return "쿼드라킬";
            case triple >= 1:
                return "트리플킬";
            case double >= 1:
                return "더블킬";
            default:
                return "X";
        }
    };
    return (
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
                <th>{teamPlayers[0].teamId === 100 ? '블루팀 ' : '레드팀 '}{teamPlayers[0].win ? '승리' : '패배'}</th>
                <th>KDA</th>
                <th>피해량</th>
                <th>CS</th>
                {gameMode !== "ARAM" ? <th>와드</th> : <th>멀티킬</th>}
                <th>아이템</th>
            </tr>
            </thead>
            <tbody>
            {teamPlayers.map((player, index) => (
                <tr>
                    <td>
                        <DetailPlayerInfo
                            player={player}
                            index={index}
                            team={teamColor}
                            setViewFirstSpell={setViewFirstSpell}
                            setViewSecondSpell={setViewSecondSpell}
                            setViewMainRune={setViewMainRune}
                            setViewSubRune={setViewSubRune}
                            viewFirstSpell={viewFirstSpell}
                            viewSecondSpell={viewSecondSpell}
                            viewMainRune={viewMainRune}
                            viewSubRune={viewSubRune}
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
                    <td>
                        {player.totalMinionsKilled + player.neutralMinionsKilled}
                    </td>
                    {gameMode !== "ARAM"
                        ? <td>{player.wardsKilled} / {player.wardsPlaced}</td>
                        : <td><div className="multiple-kill">{multipleKills(player.doubleKills, player.tripleKills, player.quadraKills, player.pentaKills)}</div></td>}
                    <td>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item0}.png`}
                            alt=""
                            width={25}
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item1}.png`}
                            alt=""
                            width={25}
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item2}.png`}
                            alt=""
                            width={25}
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item3}.png`}
                            alt=""
                            width={25}
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item4}.png`}
                            alt=""
                            width={25}
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${player.item5}.png`}
                            alt=""
                            width={25}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TeamInfoTable;