import React from 'react';

const DetailSpellInfo = ({ spellKey, viewSpell, setViewSpell, index, getSpellByKey }) => (
    <>
        <div
            className={`detail-spell-description ${viewSpell[index] ? 'show' : ''}`}>
            <span>{getSpellByKey(spellKey.toString()).description}</span>
        </div>
        <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/spell/${getSpellByKey(spellKey.toString()).image.full}`}
            alt="소환사 주문"
            className="summoner-spell-image"
            width={'20px'}
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