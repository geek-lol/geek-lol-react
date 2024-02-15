import React, {useEffect, useState} from 'react';
import RankSelect from "./RankSelect";
import RankBoard from "./RankBoard";
import "../scss/Rank.scss"
import {BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight} from "react-icons/bs";
import axios from "axios";
import {RANKING_URL} from "../../../config/host-config";

const Rank = () => {

    const [ranking, setRanking] = useState(null);
    const getRankingData = async () => {
        const response = await axios.get(RANKING_URL + `/CHALLENGER`);

        if (response.status === 200 && response.data !== null) {
            setRanking(response.data);
            console.log(response.data);
        }
    };

    useEffect(() => {
        getRankingData();
    }, []);
    return (
        <div className={'rank'}>
            <div className={'rank-container'}>
                <div className={'rank-title'}>
                    <p>랭킹</p>
                </div>
                <div className={'rank-select'}>
                    <RankSelect/>
                </div>
                <div className={'rank-board'}>
                    <RankBoard/>
                </div>
                <div className={'rank-bottom'}>
                    <nav className={'navigation'}>
                        <ul className={'paging'}>
                            <li className={'page-item'}>
                                <BsChevronDoubleLeft/>
                            </li>
                            <li className={'page-item'}>
                                <BsChevronLeft/>
                            </li>
                            <li className={'page-item'}>
                                <a href="#">
                                    1
                                </a>
                            </li>
                            <li className={'page-item'}>
                                <BsChevronRight/>
                            </li>
                            <li className={'page-item'}>
                                <BsChevronDoubleRight/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Rank;