import React, { useEffect, useState } from 'react';
import RankSelect from "./RankSelect";
import RankBoard from "./RankBoard";
import "../scss/Rank.scss";
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { RANKING_URL } from "../../../config/host-config";

const Rank = () => {
    const [ranking, setRanking] = useState(null);
    const [tier, setTier] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Number of items to display per page
    const maxVisiblePages = 8; // Maximum number of pages to display in pagination

    const getRankingData = async (tier) => {
        setRanking(null);
        const response = await axios.get(RANKING_URL + `/` + selectedValue);

        if (response.status === 200 && response.data !== null) {
            setRanking(response.data.entries);
            setTier(response.data.tier);
            console.log(response.data.entries);
        }
    };
    const [selectedValue, setSelectedValue] = useState('CHALLENGER');

    useEffect(() => {
        getRankingData(selectedValue);
        setCurrentPage(1); // Reset current page to 1 when selectedValue changes
    }, [selectedValue]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the start and end indices based on the current page and tier
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, ranking?.length || 0);

    // Get the subset of data for the current page
    const currentRankingPage = ranking?.slice(startIndex - 1, endIndex) || [];

    // Calculate total pages based on the tier's total entries
    const totalEntries = ranking?.length || 0;
    const totalPages = Math.ceil(totalEntries / itemsPerPage);

    // Calculate the range of pages to display in pagination
    const pageRangeStart = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const pageRangeEnd = Math.min(totalPages, pageRangeStart + maxVisiblePages - 1);

    const handleSelectChange = (value) => {
        setSelectedValue(value);
        console.log("Selected value in parent component:", value);
    };

    return (
        <div className={'rank'}>
            <div className={'rank-container'}>
                <div className={'rank-title'}>
                    <p>솔로랭크 순위</p>
                </div>
                <div className={'rank-select'}>
                    <RankSelect onSelectChange={handleSelectChange} />
                </div>
                <div className={'rank-board'}>
                    <RankBoard ranking={currentRankingPage} currentPage={currentPage} itemsPerPage={itemsPerPage} selectedValue={selectedValue} tier={tier}/>
                </div>
                <div className={'rank-bottom'}>
                    <nav className={'navigation'}>
                        <ul className={'paging'}>
                            {currentPage !== 1 && (
                                <>
                                    <li className={'page-item'} onClick={() => handlePageChange(1)}>
                                        <BsChevronDoubleLeft />
                                    </li>
                                    <li className={'page-item'} onClick={() => handlePageChange(currentPage - 1)}>
                                        <BsChevronLeft />
                                    </li>
                                </>
                            )}
                            {[...Array(pageRangeEnd - pageRangeStart + 1)].map((_, index) => (
                                <li key={index + pageRangeStart} className={`page-item ${currentPage === index + pageRangeStart ? 'current-page' : ''}`} onClick={() => handlePageChange(index + pageRangeStart)}>
                                    <p>{index + pageRangeStart}</p>
                                </li>
                            ))}
                            {currentPage !== totalPages && (
                                <>
                                    <li className={'page-item'} onClick={() => handlePageChange(currentPage + 1)}>
                                        <BsChevronRight />
                                    </li>
                                    <li className={'page-item'} onClick={() => handlePageChange(totalPages)}>
                                        <BsChevronDoubleRight />
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Rank;