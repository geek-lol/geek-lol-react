import React from 'react';
import SkeletonLeftContent from "./SkeletonLeftContent";
import SkeletonRightContent from "./SkeletonRightContent";
import "../scss/SkeletonContent.scss";
import Header from "../../../header/js/Header";

const SkeletonContent = ({infoLoading, gamesLoading}) => {
    return (
        <>
            <div className="summoner-info-container">
                <div className="left-ad box"></div>

                <div className="summoner-info-content">
                    {infoLoading ?? (
                        <SkeletonLeftContent/>
                    )}
                    {gamesLoading ?? (
                        <SkeletonRightContent/>
                    )}
                </div>
                <div className="left-ad box"></div>

            </div>
        </>
    );
};

export default SkeletonContent;