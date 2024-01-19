import React, {useState} from 'react';
import Header from "../../header/js/Header";
import '../scss/main.scss';
import {FaSearch} from "react-icons/fa";
const Main = () => {


    return (
        <>

            <div className='mainBox'>
                <div className='main__Title'>
                    <a href='#' className='title__logo'>
                        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지" />
                    </a>
                </div>
                <div className='input__Title'>
                    <input className='title' placeholder='소환사명을 입력해주세요'/>
                    <FaSearch className='a'/>
                </div>
            </div>

        </>
    );
};

export default Main;