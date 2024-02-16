import React from 'react';
import "../scss/RankSelect.scss"
import {BsChevronDown} from "react-icons/bs";
const RankSelect = ({onSelectChange}) => {

    const changeTierHandler = e => {
        console.log(e.target.value);
        const value = e.target.value.toUpperCase();
        onSelectChange(value); // Call the callback function
    };



    return (
        <>
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