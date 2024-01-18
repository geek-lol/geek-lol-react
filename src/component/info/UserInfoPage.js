import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {OrbitProgress} from "react-loading-indicators";

const UserInfoPage = () => {
    const { searchValue, tag } = useParams();
    const [info, setInfo] = useState(null);
    const [recentGames, setResentGames] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);
    const [recentLoading, setRecentLoading] = useState(false);

    const fetchInfo = async () => {
        setInfoLoading(true);
        try {
            const response = await axios.get(`http://localhost:8686/find/${searchValue}/${tag ? tag : 'KR1'}`);
            setInfo(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
        setInfoLoading(false);
    };

    const fetchRecentGames = async () => {
        setRecentLoading(true);
        try {
            const response = await axios.get(`http://localhost:8686/recentGames/1/20`);
            setResentGames(response.data);
            console.log(response.data);
        } catch(e) {
            console.error(e)
        }
        setRecentLoading(false);
    }

    useEffect(() => {
        fetchInfo()
            .then(() => fetchRecentGames());
    }, []);

    if (infoLoading) return <OrbitProgress  color="#32cd32" size="medium" text="" textColor="" />;

    return (
        <div>
            {info && (
                <>
                    {tag === 'KR1' ? `${searchValue}#KR1` : `${searchValue}#${info.userInfo.tagLine}`}
                    <h2>level: {info.userInfo.summonerLevel}</h2>
                    <img
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${info.userInfo.profileIconId}.jpg`}
                        alt={`소환사 ${info.userInfo.profileIconId} 아이콘`}
                    />

                    <h2>game type : {info.leagueInfo[0].queueType}</h2>
                    <h2>{info.leagueInfo[0].tier} {info.leagueInfo[0].rank}티어</h2>
                    {info.leagueInfo.map((league, index) => (
                        <div key={index}>
                            {league.tier === "IRON" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/iron.png'}
                                        alt="Iron Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}
                            {league.tier === "BRONZE" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/bronze.png'}
                                        alt="Bronze Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "SILVER" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/silver.png'}
                                        alt="Silver Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "GOLD" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/gold.png'}
                                        alt="gold image"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "PLATINUM" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/platinum.png'}
                                        alt="Platinum Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "EMERALD" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/emerald.png'}
                                        alt="Emerald Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "DIAMOND" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/diamond.png'}
                                        alt="Diamond Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "MASTER" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/master.png'}
                                        alt="Master Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "GRANDMASTER" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/grandmaster.png'}
                                        alt="Grandmaster Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}

                            {league.tier === "CHALLENGER" && (
                                <>
                                    <img
                                        src={process.env.PUBLIC_URL + '/assets/challenger.png'}
                                        alt="Challenger Tier"
                                        width={"300px"}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                    <h2>리그 포인트 : {info.leagueInfo[0].leaguePoints}</h2>
                    <h2>승 : {info.leagueInfo[0].wins}</h2>
                    <h2>패 : {info.leagueInfo[0].losses}</h2>
                    <h2>승률 : {(info.leagueInfo[0].wins / (info.leagueInfo[0].wins + info.leagueInfo[0].losses) * 100).toFixed(2)}%</h2>
                </>
            )}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            { recentLoading ? <OrbitProgress  color="#32cd32" size="medium" text="" textColor="" /> : <div>전적정보 가져왔음!</div> }
        </div>
    );

};

export default UserInfoPage;
