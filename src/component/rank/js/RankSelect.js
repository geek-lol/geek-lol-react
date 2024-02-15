import React from 'react';
import "../scss/RankSelect.scss"
import {BsChevronDown} from "react-icons/bs";
const RankSelect = () => {

    const changeTierHandler = e => {
        console.log(e.target.value);
    };

    return (
        <>
            <div className={'rank-selectbox'}>
                <select>
                        <option>솔로</option>
                        <option>자유</option>
                </select>
            </div>
            <div className={'tier-selectbox'}>
                <select className={'tier-select'} onChange={changeTierHandler}>
                    <option value="Challenger">Challenger</option>
                    <option value="GrandMaster">GrandMaster</option>
                    <option value="Master">Master</option>
                </select>
            </div>
        </>
    );
};

export default RankSelect;