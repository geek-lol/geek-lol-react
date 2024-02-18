import React from 'react';

const RuneInfo = ({runeType, getRune, perk, index, viewRune, setViewRune}) => {
    const handleMouseEnterLeave = (isEnter) => {
        const newIsShowDetailRune = [...viewRune];
        newIsShowDetailRune[index] = isEnter;
        setViewRune(newIsShowDetailRune);
    };

    // const rune = runeType === "main" ? getRune(perk.selections[0].perk) : getRune(perk.style);

    let rune;
    if(runeType === "main") {
        rune = getRune(perk.selections[0].perk);
    } else if(runeType === "sub") {
        rune = getRune(perk.style);
    }

    if (!rune) {
        return <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-fill-red.png`} alt="not rune" width={20}/>
    }

    return (
        <div className="detail-rune-info">
            <div className={`detail-rune-description ${viewRune[index] ? 'show' : ''}`}>
                <span
                    dangerouslySetInnerHTML={{__html: `${runeType === "main" ? `${rune.name}<hr/>${rune.longDesc}` : rune.name}`}}></span>
            </div>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                alt={rune.name}
                width={20}
                onMouseEnter={() => {
                    handleMouseEnterLeave(true);
                }}
                onMouseLeave={() => {
                    handleMouseEnterLeave(false);
                }}
            />
        </div>
    );
};

const DetailRuneInfo = ({
                            player,
                            viewMainRune,
                            viewSubRune,
                            setViewMainRune,
                            setViewSubRune,
                            index,
                            getMainRune,
                            getSubRune
                        }) => {
    return (
        <>
            {player.perks.styles.map((perk, perkIndex) => {
                if (perkIndex === 0) {
                    return <RuneInfo runeType="main" getRune={getMainRune} perk={perk} index={index}
                                     viewRune={viewMainRune} setViewRune={setViewMainRune}/>
                } else if (perkIndex === 1) {
                    return <RuneInfo runeType="sub" getRune={getSubRune} perk={perk} index={index}
                                     viewRune={viewSubRune} setViewRune={setViewSubRune}/>
                }
            })}
        </>
    );
};

export default DetailRuneInfo;