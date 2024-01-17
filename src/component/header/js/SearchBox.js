import React from 'react';
import PropTypes from 'prop-types';
import {FaSearch} from "react-icons/fa";

const SearchBox = props => {
    return (
        <>
            <div className="input__box">
                <form name="search">
                    <input type="text" className="input" placeholder="소환사명을 입력해주세요"/>
                    <FaSearch className='i'/>
                </form>

            </div>
        </>
    );
};

SearchBox.propTypes = {};

export default SearchBox;