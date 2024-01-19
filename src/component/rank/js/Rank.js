import React from 'react';
import RankSelect from "./RankSelect";
import RankBoard from "./RankBoard";
import "../scss/Rank.scss"
import {BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight} from "react-icons/bs";
import {Reset} from "styled-reset";

const Rank = () => {
    return (
        <div className={'rank'}>
            <div className={'rank-container'}>
                <div className={'rank-title'}>
                    <p>랭킹</p>
                </div>
                <div className={'rank-select'}>
                    <RankSelect />
                </div>
                <div className={'rank-board'}>
                    <RankBoard />
                </div>
                <div className={'rank-bottom'}>
                    <nav className={'navigation'}>
                        <ul className={'paging'}>
                            <li className={'page-item'}>
                                <a href="#">
                                    <BsChevronDoubleLeft />
                                </a>
                            </li>
                            <li className={'page-item'}>
                                <a href="#">
                                    <BsChevronLeft />
                                </a>
                            </li>
                            <li className={'page-item'}>
                                <a href="#">
                                    1
                                </a>
                            </li>
                            <li className={'page-item'}>
                                <a href="#">
                                    <BsChevronRight />
                                </a>
                            </li>
                            <li className={'page-item'}>
                                <a href="#">
                                    <BsChevronDoubleRight />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Rank;