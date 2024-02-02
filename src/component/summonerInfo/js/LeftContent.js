import React from 'react';
import "../scss/LeftContent.scss"

const LeftContent = ({userInfo, infoLoading, tag}) => {
    if (infoLoading) {
        return `<div>Loading...</div>`;
    }
    const leagueInfo = userInfo.leagueInfo;
    const flexRankIndex = leagueInfo.findIndex(item => item.queueType === 'RANKED_FLEX_SR');
    const soloRankIndex = leagueInfo.findIndex(item => item.queueType === 'RANKED_SOLO_5x5')
    return (
        <div className={"left-content"}>          {/* flex-direction: column */}
            <div className={"summoner-profile"}>    {/* row  */}
                <div className={"profile-image-container"}>
                    {userInfo !== null ? (
                        <>
                            <img
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${userInfo.userInfo.profileIconId}.jpg`}
                                alt="profile icon"/>
                            <div className={"summoner-level"}><span>{userInfo.userInfo.summonerLevel}</span></div>
                        </>
                    ) : (<></>)}
                </div>
                {/* column */}
                <div className="ranking-nickname-container">
                    <div className="nickname-prev-ranking">
                                <span
                                    className="nickname">{tag !== 'KR1' ? userInfo.userInfo.gameName : userInfo.leagueInfo[0].summonerName}
                                    <p>#{tag}</p></span>
                        <div className="prev-ranking">
                            <span className="prev-nickname">prev. {userInfo.userInfo.name}</span>
                            <span className="ranking">랭킹 : 000,000위</span>
                        </div>
                    </div>
                    <button className="reloadBtn" onClick={() => window.location.reload()}>
                        전적갱신
                    </button>
                </div>
            </div>
            <div className="player-info-rank">
                <div className="solo-rank-title title-container">
                    <span>솔로랭크</span>
                </div>
                <div className="rankInfo">
                    <div className="solo-rank-content player-info-content-container">
                        {leagueInfo[soloRankIndex] ? (
                                <>
                                    {leagueInfo[soloRankIndex].tier === "IRON" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/iron.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "BRONZE" ? (
                                        <img src={process.env.PUBLIC_URL + '/tieriamge/bronze.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "SILVER" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/silver.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "GOLD" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/gold.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "PLATINUM" ? (
                                        <img src={process.env.PUBLIC_URL + '/tieriamge/platinum.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "EMERALD" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/emerald.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "DIAMOND" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/diamond.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "MASTER" ? (
                                        <img src={process.env.PUBLIC_URL + '/tierimage/master.png'} alt="profile icon"/>
                                    ) : leagueInfo[soloRankIndex].tier === "GRANDMASTER" ? (
                                        <img src={process.env.PUBLIC_URL + '/tieriamge/grandmaster.png'}
                                             alt="profile icon"/>
                                    ) : <img src={process.env.PUBLIC_URL + '/tierimage/challenger.png'}
                                             alt="profile icon"/>}
                                    <div className="tier-icon-info-point"> {/* row */}
                                        <div className={"tier-win-lose-description"}>
                                <span
                                    className="tier">{leagueInfo[soloRankIndex].tier} {leagueInfo[soloRankIndex].rank}</span>
                                            <span
                                                className="description">{leagueInfo[soloRankIndex].wins}승 {leagueInfo[soloRankIndex].losses}패</span>
                                        </div>
                                        <div className="rank-point-win-late">
                                            <span
                                                className="description">{leagueInfo[soloRankIndex].leaguePoints} LP</span>
                                            <span
                                                className="description">승률 {(leagueInfo[soloRankIndex].wins / (leagueInfo[soloRankIndex].wins + leagueInfo[soloRankIndex].losses) * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </>
                            ) :
                            <>
                                <img src={process.env.PUBLIC_URL + '/tierimage/unranked.png'} alt="profile icon"/>
                                <div className="tier-icon-info-point"> {/* row */}
                                    <div className={"tier-win-lose-description"}>
                                        <span className="tier" style={{color: "black"}}>UNRANKED</span>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="player-info-rank">
                <div className="rank-title title-container">
                    <span>자유랭크</span>
                </div>
                <div className="rankInfo">
                    <div className="player-info-rank-content player-info-content-container">
                        {leagueInfo[flexRankIndex] ? (
                            <>
                                {leagueInfo[flexRankIndex].tier === "IRON" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/iron.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "BRONZE" ? (
                                    <img src={process.env.PUBLIC_URL + '/tieriamge/bronze.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "SILVER" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/silver.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "GOLD" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/gold.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "PLATINUM" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/platinum.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "EMERALD" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/emerald.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "DIAMOND" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/diamond.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "MASTER" ? (
                                    <img src={process.env.PUBLIC_URL + '/tierimage/master.png'} alt="profile icon"/>
                                ) : leagueInfo[flexRankIndex].tier === "GRANDMASTER" ? (
                                    <img src={process.env.PUBLIC_URL + '/tieriamge/grandmaster.png'}
                                         alt="profile icon"/>
                                ) : <img src={process.env.PUBLIC_URL + '/tierimage/challenger.png'}
                                         alt="profile icon"/>}
                                <div className="tier-icon-info-point"> {/* row */}
                                    <div className={"tier-win-lose-description"}>
                                        <span
                                            className="tier">{leagueInfo[flexRankIndex].tier} {leagueInfo[flexRankIndex].rank}</span>
                                        <span
                                            className="description">{leagueInfo[flexRankIndex].wins}승 {leagueInfo[flexRankIndex].losses}패</span>
                                    </div>
                                    <div className="rank-point-win-late">
                                        <span
                                            className="description">{leagueInfo[flexRankIndex].leaguePoints} LP</span>
                                        <span
                                            className="description">승률 {(leagueInfo[flexRankIndex].wins / (leagueInfo[flexRankIndex].wins + leagueInfo[flexRankIndex].losses) * 100).toFixed(2)}%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <img src={process.env.PUBLIC_URL + '/tierimage/unranked.png'} alt="profile icon"/>
                                <div className="tier-icon-info-point"> {/* row */}
                                    <div className={"tier-win-lose-description"}>
                                        <span className="tier" style={{color: "black"}}>UNRANKED</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftContent;