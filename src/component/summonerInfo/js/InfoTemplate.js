import React, {useEffect, useState} from 'react';
import Header from "../../header/js/Header";
import LeftContent from "./LeftContent";
import "../scss/InfoTemplate.scss";
import RightContent from "./RightContent";
import axios from "axios";
import {useParams} from "react-router-dom";
import NotFoundSummoner from "./NotFoundSummoner";
import SkeletonLeftContent from "../skeleton/js/SkeletonLeftContent";
import SkeletonRightContent from "../skeleton/js/SkeletonRightContent";
import SkeletonContent from "../skeleton/js/SkeletonContent";
import {CHAMPION_MASTERY_URL, FIND_USER_URL, RECENT_GAMES_URL} from "../../../config/host-config";

const InfoTemplate = () => {
    const {searchValue, tag} = useParams();
    const [userInfo, setUserInfo] = useState(undefined)
    const [infoLoading, setInfoloading] = useState(null);
    const [gamesLoading, setGamesLoading] = useState(false);
    const [recentGames, setRecentGames] = useState([]);

    const getUserInfo = async () => {
        setInfoloading(true);
        try {
            const response = await axios.get(FIND_USER_URL +`/${searchValue}/${tag ? tag : 'KR1'}`);
            setUserInfo(response.data.userInfo != null ? response.data : null);
            console.log(response.data);
            await getRecentGames();
            await getChampionMastery();
        } catch (e) {
            console.error(e);
            setUserInfo(null);
        }

        setInfoloading(false);
    };

    const [startIndex, setStartIndex] = useState(0);
    const [moreGame, setMoreGame] = useState(false);
    const increment = 10;

    const getRecentGames = async () => {

        if (startIndex > 0) {
            setMoreGame(true)
        } else {
            setGamesLoading(true);
        }
        try {
            const response = await axios.get(RECENT_GAMES_URL + `/${startIndex}/${10}`);
            if (response.status === 200) {

                setRecentGames(prevGames => [...prevGames, ...response.data]);

                // recentGames 출력 로직
                console.log(response.data);

                setStartIndex(prevIndex => prevIndex + increment);
            }
        } catch (e) {
            console.error(e);
        }
        if (startIndex > 0) {
            setMoreGame(false)
        } else {
            setGamesLoading(false);
        }
    };

    const [championMastery, setChampionMastery] = useState(undefined);
    const getChampionMastery = async () => {
        try {
            const response = await axios.get(CHAMPION_MASTERY_URL);
            if(response.status === 200) {
                setChampionMastery(response.data);
                console.log(response.data);
            }
        } catch (e) {
            console.error(e)
        }
    };

    const [spell, setSpell] = useState([]);
    const getAllSpellData = async () => {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.2.1/data/ko_KR/summoner.json');
        const data = await response.data;

        setSpell(data);
        // console.log(response);
    };

    const [items, setItems] = useState([]);
    const getAllItemData = async () => {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.2.1/data/ko_KR/item.json`);
        const data = await response.data;

        setItems(data);
        // console.log(response);
    }

    const [champions, setChampions] = useState([]);
    const getAllChampionData = async () => {
      const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.2.1/data/ko_KR/champion.json`);
      const data = await response.data;
        console.log(data);
      setChampions(data);
    };

    const [runes, setRunes] = useState([]);

    const getRuneData = async () => {
        const response = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.2.1/data/ko_KR/runesReforged.json");
        const data = await response.data;
        console.log(response.data);
        setRunes(data);
    }

    useEffect(() => {
        getUserInfo();
        getAllSpellData();
        getAllItemData();
        getRuneData();
        getAllChampionData();
    }, []);


    const loadEndLeftContent = (
        <LeftContent userInfo={userInfo} infoLoading={infoLoading} tag={tag}/>
    );
    const loadEndRightContent = (
        <RightContent recentGames={recentGames} searchValue={searchValue} tag={tag} spellData={spell}
                      itemData={items} runeData={runes} championMastery={championMastery} championData={champions} getRecentGames={getRecentGames} moreGame={moreGame} />
    );

    const loadLeftContent = (
        <SkeletonLeftContent/>
    );

    const loadRightContent = (
        <SkeletonRightContent/>
    );

    if (userInfo === undefined) {
        return <SkeletonContent/>
    } else if (!userInfo || userInfo.length === 0) {
        return <NotFoundSummoner searchValue={searchValue} tag={tag}/>
    }

    return (
        <>
            <div className={"summoner-info-container"}>
                <div className="left-ad box"></div>
                <div className={"summoner-info-content"}>
                    {infoLoading ? loadLeftContent : loadEndLeftContent}
                    {gamesLoading ? loadRightContent : loadEndRightContent}
                </div>
                <div className="left-ad box"></div>
            </div>
        </>
    );
};

export default InfoTemplate;