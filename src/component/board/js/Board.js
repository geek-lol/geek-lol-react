import React, {useState} from 'react';
import Header from "../../header/js/Header";
import "../scss/board.scss";
import {CiSearch} from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import cn from "classnames";
import BoardContent from "./Freeboard/BoardContent";
import BoardHeader from "./BoardHeader";
import {
    MdKeyboardArrowLeft,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowRight
} from "react-icons/md";
import {Route, Routes} from "react-router-dom";
import FreeBoard from "./Freeboard/FreeBoard";
import LcKboard from "./LCK/LCKboard";
import Solution from "./solution/Solution";
import RequestBoard from "./ requestBoard/RequestBoard";
const Board = ({touch}) => {
    return (
        <>
            <BoardHeader touch={touch}/>
            <Routes>
                <Route path={'/FreeBoard'} element={<FreeBoard/>}/>
                <Route path={'/LCK'} element={<LcKboard/>}/>
                <Route path={'/Solution'} element={<Solution/>}/>
                <Route path={'/Request'} element={<RequestBoard/>}/>
            </Routes>

        </>

    );
};

export default Board;