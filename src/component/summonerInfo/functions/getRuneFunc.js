export const getMainRuneById = (id, runeData) => {
    for (const category of runeData) {
        if (category.slots) {
            for (const slot of category.slots) {
                if (slot.runes) {
                    for (const rune of slot.runes) {
                        if (rune.id === id) {
                            return rune;
                        }
                    }
                }
            }
        }
    }
    return null;
};

export const getSubRuneData = (id, runeData) => {
    for (const category of runeData) {
        if (category.id === id) {
            return {
                name: category.name,
                icon: category.icon
            };
        }
    }
    return null;
};