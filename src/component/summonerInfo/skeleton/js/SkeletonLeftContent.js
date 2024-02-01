import React from 'react';
import "../scss/SkeletonLeftContent.scss";
const SkeletonLeftContent = () => {
    return (
        <div className={"skeleton-left-content"}>
            <div className={"skeleton-summoner-profile"}></div>
            <div className="skeleton-rank">
                <div className="skeleton-title-container"></div>
                <div className="skeleton-rankInfo"></div>
            </div>
            <div className="skeleton-rank">
                <div className="skeleton-title-container"></div>
                <div className="skeleton-rankInfo"></div>
            </div>
        </div>
    );
};

export default SkeletonLeftContent;