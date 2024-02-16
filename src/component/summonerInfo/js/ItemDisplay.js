import React, {useState} from 'react';
import "../scss/Game.scss";

const ItemDisplay = ({
                         itemKey,
                         getItemByKey,
                     }) => {
    const item = getItemByKey(itemKey.toString());
    if (!item) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isHovered, setHovered] = useState(false);
    return (
        <>
            {itemKey > 0
                ? <>
                    <div
                        className={`item-description ${isHovered ? "show" : ""}`}
                        dangerouslySetInnerHTML={{
                            __html: `<p style="font-weight: 700;">${item.name}</p><hr><p>${item.description}</p><hr>${item.gold.total}골드`,
                        }}
                    />
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/item/${itemKey}.png`}
                        alt={`${item.name}`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    />
                </>
                : <img
                    src={process.env.PUBLIC_URL + "/assets/icon_non_item.svg"}
                    alt="non-item"
                    width={25}
                />
            }

        </>
    );
};

export default ItemDisplay;