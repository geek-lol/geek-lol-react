import React from 'react';
import PropTypes from 'prop-types';
import {CiSearch} from "react-icons/ci";
import {RxCross2} from "react-icons/rx";

const SearchBox = props => {
    return (
        <>
            <div className="input__box">
                <div className="searchBox">
                    <CiSearch className="searchI" size={14*2}/>
                    <input type="text" className="input" placeholder="소환사명을 입력해주세요"/>
                    <RxCross2 className="crossI" size={14*2}/>
                </div>
            </div>
        </>
    );
};

SearchBox.propTypes = {};

export default SearchBox;