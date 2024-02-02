import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {CiSearch} from "react-icons/ci";
import {RxCross2} from "react-icons/rx";
import {useNavigate} from "react-router-dom";

const SearchBox = () => {
    const [inputData,setInputData]=useState('');
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        navigate(`/find/${inputData}`);

    };
    const verificationHandler = () => {
        let text=document.querySelector('input').value;
        if (!text.includes('#')) {
            text = text + '/KR1';
            setInputData(text);
        }else if(text.includes('#')){
            text = text.replace(/#([^#]*)$/, (match, group) => {
                if (group !== '') {
                    return '/' + group;
                }
                return '/KR1';
            });
            setInputData(text);
        }
        console.log(text);
    };
    return (
        <>
            <div className="input__box">
                <form className="searchBox" onSubmit={formHandler} onChange={verificationHandler}>
                    <input type="text" className="input" placeholder="소환사명을 입력해주세요"/>
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