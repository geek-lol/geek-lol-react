import React from 'react';
import "../scss/LeftContent.scss"

const LeftContent = ({userInfo, tag}) => {

    const RankImage = ({tier}) => {
        if (tier == null) {
            return <img src={process.env.PUBLIC_URL + '/tierimage/unranked.webp'} alt="profile icon"/>;
        }

        const tierLower = tier.toLowerCase();
        return <img src={process.env.PUBLIC_URL + `/tierimage/${tierLower}.png`} alt="profile icon"/>;
    }


    const leagueInfo = userInfo.leagueInfo;
    const flexRankIndex = leagueInfo.findIndex(item => item.queueType === 'RANKED_FLEX_SR');
    const soloRankIndex = leagueInfo.findIndex(item => item.queueType === 'RANKED_SOLO_5x5')

    const tierClassNames = {
        "IRON": "iron",
        "BRONZE": "bronze",
        "SILVER": "silver",
        "GOLD": "gold",
        "PLATINUM": "platinum",
        "DIAMOND": "diamond",
        "MASTER": "master",
        "GRANDMASTER": "grandmaster",
        "CHALLENGER": "challenger",
    };

    const className = (rank) => tierClassNames[leagueInfo[rank].tier] || "unranked";
    return (
        <div className={"left-content"}>          {/* flex-direction: column */}
            <div className={"summoner-profile"}>    {/* row  */}
                <div className={"profile-image-container"}>
                    <>
                        <img
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${userInfo.userInfo.profileIconId}.jpg`}
                            alt="profile icon"/>
                        <div className={"summoner-level"}><span>{userInfo.userInfo.summonerLevel}</span></div>
                    </>
                </div>
                {/* column */}
                <div className="ranking-nickname-container">
                    <div className="nickname-prev-ranking">
                                <span className="nickname">
                                    {tag === "KR1" ? userInfo.userInfo.name : userInfo.userInfo.gameName}
                                    <p>#{tag}</p>
                                </span>
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
                                    <RankImage tier={leagueInfo[soloRankIndex].tier}/>
                                    <div className="tier-icon-info-point"> {/* row */}
                                        <div className={"tier-win-lose-description"}>
                                            <span
                                                className={`tier ${className(soloRankIndex)}`}>{leagueInfo[soloRankIndex].tier} {leagueInfo[soloRankIndex].rank}</span>
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
                                <RankImage/>
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
                                <RankImage tier={leagueInfo[flexRankIndex].tier}/>
                                <div className="tier-icon-info-point"> {/* row */}
                                    <div className={"tier-win-lose-description"}>
                                        <span
                                            className={`tier ${className(flexRankIndex)}`}>{leagueInfo[flexRankIndex].tier} {leagueInfo[flexRankIndex].rank}</span>
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
                                <RankImage/>
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