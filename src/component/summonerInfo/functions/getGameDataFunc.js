export const getSpellByKey = (key, spellData) => {
    for (const summonerSpell in spellData.data) {
        if (spellData.data.hasOwnProperty(summonerSpell) && spellData.data[summonerSpell].key === key) {
            return spellData.data[summonerSpell];
        }
    }
    return null; // Return null if no match is found
};