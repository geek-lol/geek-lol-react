import React from 'react';

const RankSelect = () => {
    return (
        <>
            <div className={'rank-selectbox'}>
                <select>
                    <option>솔로</option>
                    <option>자유</option>
                </select>
            </div>
            <div className={'tier-selectbox'}>
                <select>
                    <option>Challenger</option>
                    <option>GrandMaster</option>
                    <option>Master</option>
                    <option>Diamond</option>
                    <option>Emerald</option>
                    <option>Platinum</option>
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Bronze</option>
                    <option>Iron</option>
                </select>
            </div>
        </>
    );
};

export default RankSelect;