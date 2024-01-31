import {useState} from 'react';
import "../scss/Game.scss";

const ItemDisplay = ({itemKey, itemIndex, toggleDescription, getItemByKey, showItemDescriptions, toggleShownDescriptions}) => {
    const item = getItemByKey(itemKey.toString());
    if (!item) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isHovered, setHovered] = useState(false);

    return (
        <>
            <div
                className={`item-description ${isHovered ? "show" : ""}`}
                dangerouslySetInnerHTML={{
                    __html: `<p style="font-weight: 700;">${item.name}</p><br><p>${item.description}</p><br>${item.gold.total}골드`,
                }}
            />
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${itemKey}.png`}
                alt=""
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />
        </>
    );
};

export default ItemDisplay;