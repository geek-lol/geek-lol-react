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

const InfoTemplate = () => {
    const {searchValue, tag} = useParams();
    const [userInfo, setUserInfo] = useState(undefined)
    const [infoLoading, setInfoloading] = useState(null);
    const [gamesLoading, setGamesLoading] = useState(false);
    const [recentGames, setRecentGames] = useState(null);

    const getUserInfo = async () => {
        setInfoloading(true);
        try {
            const response = await axios.get(`http://localhost:8686/find/${searchValue}/${tag ? tag : 'KR1'}`);
            setUserInfo(response.data.userInfo != null ? response.data : null);
            await getRecentGames();
        } catch (e) {
            console.error(e);
            setUserInfo(null);
        }

        setInfoloading(false);
    };

    const getRecentGames = async () => {
        setGamesLoading(true);
        try {
            const response = await axios.get(`http://localhost:8686/recentGames/${0}/${1}`);
            if (response.status === 200) {
                setRecentGames(response.data);
                // recentGames 출력 로직
                // console.log(response.data);
            }
        } catch (e) {
            console.error(e);
        }
        setGamesLoading(false);
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

    const [runes, setRunes] = useState([]);

    const getRuneData = async () => {
        const response = await axios.get("https://ddragon.leagueoflegends.com/cdn/14.2.1/data/ko_KR/runesReforged.json");
        const data = await response.data;
        // console.log(response.data);
        setRunes(data);
    }

    useEffect(() => {
        getUserInfo();
        getAllSpellData();
        getAllItemData();
        getRuneData();
    }, []);


    const loadEndLeftContent = (
        <LeftContent userInfo={userInfo} infoLoading={infoLoading} tag={tag}/>
    );
    const loadEndRightContent = (
        <RightContent recentGames={recentGames} searchValue={searchValue} spellData={spell}
                      itemData={items} runeData={runes}/>
    );

    const loadLeftContent = (
        <SkeletonLeftContent/>
    );

    const loadRightContent = (
        <SkeletonRightContent/>
    );

    if (userInfo === undefined) {
        return <SkeletonContent/>
    } else if (userInfo == null) {
        return <NotFoundSummoner searchValue={searchValue} tag={tag}/>
    }

    return (
        <>
            <Header/>
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