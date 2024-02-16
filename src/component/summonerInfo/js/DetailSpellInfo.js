import React from 'react';

const DetailSpellInfo = ({ spellKey, viewSpell, setViewSpell, index, getSpellByKey }) => (
    <>
        <div
            className={`detail-spell-description ${viewSpell[index] ? 'show' : ''}`}>
            <p>{getSpellByKey(spellKey.toString()).name}</p>
            <hr/>
            <p>{getSpellByKey(spellKey.toString()).description}</p>
        </div>
        <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey(spellKey.toString()).image.full}`}
            alt="소환사 주문"
            className="summoner-spell-image"
            width={'18px'}
            onMouseEnter={() => {
                const newIsShowDetailSpell = [...viewSpell];
                newIsShowDetailSpell[index] = true;
                setViewSpell(newIsShowDetailSpell);
            }}
            onMouseLeave={() => {
                const newIsShowDetailSpell = [...viewSpell];
                newIsShowDetailSpell[index] = false;
                setViewSpell(newIsShowDetailSpell);
            }}
        />
    </>
);

export default DetailSpellInfo;