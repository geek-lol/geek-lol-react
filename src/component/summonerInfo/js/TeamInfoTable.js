import React, {useState} from 'react';
import DetailPlayerInfo from "./DetailPlayerInfo";
import "../scss/DetailTable.scss";
import ItemDisplay from "./ItemDisplay";

const TeamInfoTable = ({
                           teamPlayers,
                           teamColor,
                           gameMode,
                           getSubRuneData,
                           getMainRuneById,
                           getSpellByKey,
                           viewFirstSpell,
                           viewSecondSpell,
                           viewMainRune,
                           viewSubRune,
                           setViewFirstSpell,
                           setViewSecondSpell,
                           setViewMainRune,
                           setViewSubRune,
                           itemData,
                           runeData
                       }) => {

    const getItemByKey = (key) => {
        for (const userItem in itemData.data) {
            if (itemData.data.hasOwnProperty(userItem) && itemData.data[userItem]) {
                return itemData.data[key];
            }
        }
        return null;
    };

    const toggleDescription = (setFunc, index) => {
        setFunc(prev => prev.map((value, i) => i === index ? !value : value));
    };


    const [showItemDescriptions, setShowItemDescriptions] = useState([false, false, false, false, false, false]);


    const multipleKills = (double, triple, quadra, penta) => {
        switch (true) {
            case penta >= 1:
                // setMultiKill("penta");
                return "펜타킬";
            case quadra >= 1:
                // setMultiKill("quadra");
                return "쿼드라킬";
            case triple >= 1:
                // setMultiKill("triple");
                return "트리플킬";
            case double >= 1:
                // setMultiKill("double");
                return "더블킬";
            default:
                // setMultiKill("none");
                return "X";
        }
    };
    return (
        <table className={"detail-table"}>
            <colgroup>
                <col width={"33%"}/>
                <col width={"12%"}/>
                <col width={"8%"}/>
                <col width={"7%"}/>
                <col width={"7%"}/>
                <col width={"22%"}/>
            </colgroup>
            <thead className={"detail-thead"}>
            <tr className={"detail-thead-tr"}>
                <th className={"detail-th"}>{teamPlayers[0].teamId === 100 ? '블루팀 ' : '레드팀 '}{teamPlayers[0].win ? '승리' : '패배'}</th>
                <th className={"detail-th"}>KDA</th>
                <th className={"detail-th"}>피해량</th>
                <th className={"detail-th"}>CS</th>
                {gameMode !== "ARAM"
                    ? <th className={"detail-th"}>
                        <p>와드</p>
                        <p style={{fontSize: "12px"}}>제거/설치</p>
                      </th>
                    : <th className={"detail-th"}>멀티킬</th>}
                <th className={"detail-th"}>아이템</th>
            </tr>
            </thead>
            {teamPlayers.map((player, index) => (
                <tbody className={`detail-tbody ${player.win ? "victory-team" : "lose-team"}`}>
                <tr className={"detail-tr"}>
                    <td className={"detail-td"}>
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
                            runeData={runeData}
                        />
                    </td>
                    <td className={"detail-td"}>
                        <p>{player.kills} / {player.deaths} / {player.assists}</p>
                        <p className="kda">KDA {((player.kills + player.assists) / player.deaths).toFixed(1)}</p>
                    </td>
                    <td className={"detail-td"}>
                        {(player.totalDamageDealtToChampions).toLocaleString()}
                    </td>
                    <td className={"detail-td"}>
                        {player.totalMinionsKilled + player.neutralMinionsKilled}개
                    </td>
                    {gameMode !== "ARAM"
                        ? <td className={"detail-td"}>{player.wardsKilled} / {player.wardsPlaced}</td>
                        : <td className={"detail-td"}>
                            <div className={`multiple-kill`}>
                                <span className={`${multipleKills(player.doubleKills, player.tripleKills, player.quadraKills, player.pentaKills)}`}>{multipleKills(player.doubleKills, player.tripleKills, player.quadraKills, player.pentaKills)}</span>
                            </div>
                        </td>
                    }
                    <td className={"item-td"}>
                        {[0, 1, 2, 3, 4, 5, 6].map((itemIndex) => (
                            <React.Fragment key={itemIndex}>
                                {player[`item${itemIndex}`] > 0 ? (
                                    <ItemDisplay
                                        key={itemIndex}
                                        itemKey={player[`item${itemIndex}`]}
                                        itemIndex={itemIndex}
                                        toggleDescription={toggleDescription}
                                        getItemByKey={getItemByKey}
                                        showItemDescriptions={showItemDescriptions}
                                        toggleShownDescriptions={setShowItemDescriptions}
                                    />
                                ) : (
                                    <img
                                        src={process.env.PUBLIC_URL + "/assets/icon_non_item.svg"}
                                        alt="non-item"
                                        width={25}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </td>
                </tr>
                </tbody>
            ))}

        </table>
    );
};

export default TeamInfoTable;