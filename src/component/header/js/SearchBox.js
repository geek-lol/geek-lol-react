import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CiSearch} from "react-icons/ci";
import {RxCross2} from "react-icons/rx";

const SearchBox = ({onSubmit, ...rest}) => {
    return (
        <>
            <div className="input__box">
                <form className="searchBox" onSubmit={onSubmit}>
                    <input {...rest} type="text" className="input" placeholder="소환사명을 입력해주세요"/>
                    {/*<RxCross2 className="crossI" size={24}/>*/}
                    <button type="submit" >
                        <CiSearch className="searchI" size={24}/>
                    </button>
                </form>
            </div>
        </>
    );
};

SearchBox.propTypes = {};

export default SearchBox;