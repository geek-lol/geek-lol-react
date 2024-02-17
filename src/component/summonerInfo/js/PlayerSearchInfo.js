import React, {useState} from 'react';
import ItemDisplay from "./ItemDisplay";

const toggleDescription = (setFunc, index) => {
    setFunc(prev => prev.map((value, i) => i === index ? !value : value));
};


const PlayerSearchInfo = ({
                              player,
                              getSpellByKey,
                              getMainRuneById,
                              getSubRuneData,
                              itemData,
                          }) => {
    const [showSpellDescription1, setShowSpellDescription1] = useState(false);
    const [showSpellDescription2, setShowSpellDescription2] = useState(false);

    const [showItemDescriptions, setShowItemDescriptions] = useState([false, false, false, false, false, false]);

    const [isViewMainRuneDesc, setIsViewMainRuneDesc] = useState(false);
    const [isViewSubRuneDesc, setIsViewSubRuneDesc] = useState(false);


    const getItemByKey = (key) => {
        for (const userItem in itemData.data) {
            if (itemData.data.hasOwnProperty(userItem) && itemData.data[userItem]) {
                return itemData.data[key];
            }
        }
        return null;
    };

    const calculateKDA = (kill, death, assist) => {
        const kda = ((kill + assist) / death).toFixed(2);
        if (death === 0) {
            return <span className={`kda kda-perfect`}>Perfect</span>
        } else {
            return <span className={`kda ${kda < 1 ? 'kda-brown' : kda < 2 ? 'kda-green' : 'kda-blue'}`}>KDA {kda}</span>
        }
    };

    return (
        <div className="my-game-data">
            <div className={"player-info"}>
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${player.championName}.png`}
                    alt={`${player.championName}`}
                />
                {player.summoner1Id && (
                    <div className="summoner-spell-info" style={{position: 'relative'}}>
                        <div
                            className={`spell-description ${showSpellDescription1 ? 'show' : ''}`}>
                            <p>{getSpellByKey(player.summoner1Id.toString()).name}</p>
                            <hr></hr>
                            <p>{getSpellByKey(player.summoner1Id.toString()).description}</p>
                        </div>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey(player.summoner1Id.toString()).image.full}`}
                            alt="소환사 주문"
                            className="summoner-spell-image"
                            onMouseEnter={() => setShowSpellDescription1(true)}
                            onMouseLeave={() => setShowSpellDescription1(false)}
                        />
                        <div
                            className={`spell-description1 ${showSpellDescription2 ? 'show' : ''}`}>
                            <p>{getSpellByKey(player.summoner2Id.toString()).name}</p>
                            <hr></hr>
                            <p>{getSpellByKey(player.summoner2Id.toString()).description}</p>
                        </div>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey(player.summoner2Id.toString()).image.full}`}
                            alt="소환사 주문"
                            className="summoner-spell-image"
                            onMouseEnter={() => setShowSpellDescription2(true)}
                            onMouseLeave={() => setShowSpellDescription2(false)}
                        />
                    </div>
                )}
                <div className="rune-parent-container">
                    {player.perks.styles.map((perk, indexPerk) => {
                        if (indexPerk === 0) {
                            return (
                                <div key={indexPerk} className="summoner-rune-info"
                                     onMouseEnter={() => setIsViewMainRuneDesc(true)}
                                     onMouseLeave={() => setIsViewMainRuneDesc(false)}>
                                    <div className={`rune-description ${isViewMainRuneDesc ? 'show' : ''}`}>
                                        <div className="is-view-mainrune-desc-container"
                                             dangerouslySetInnerHTML={{__html:  `<p>${getMainRuneById(perk.selections[0].perk).name}</p><hr> <p>${getMainRuneById(perk.selections[0].perk).longDesc}</p>`}}/>
                                    </div>
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/img/${getMainRuneById(perk.selections[0].perk).icon}`}
                                        alt={getMainRuneById(perk.selections[0].perk).name}
                                    />
                                </div>
                            );
                        } else if (indexPerk === 1) {
                            return (
                                <div key={indexPerk} className="summoner-rune-info"
                                     onMouseEnter={() => setIsViewSubRuneDesc(true)}
                                     onMouseLeave={() => setIsViewSubRuneDesc(false)}>
                                    <div className={`rune-description ${isViewSubRuneDesc ? 'show' : ''}`}>
                                        <div className="is-view-subrune-desc-container"
                                             dangerouslySetInnerHTML={{__html: getSubRuneData(perk.style).name}}
                                        />
                                    </div>
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/img/${getSubRuneData(perk.style).icon}`}
                                        alt={`${getSubRuneData(perk.style).name}`}
                                    />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="kda-data-container">
                    <span className={"kda-number"}>{player.kills} / {player.deaths} / {player.assists}</span>
                    {calculateKDA(player.kills, player.deaths, player.assists)}
                </div>
            </div>
            <div className="item-slot">
                {
                    [0, 1, 2, 3, 4, 5, 6].map((itemIndex) => (
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
                    ))
                }
            </div>
        </div>
    );
};

export default PlayerSearchInfo;

