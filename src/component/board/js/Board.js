import React, {useEffect, useState} from 'react';
import "../scss/board.scss";

import {Route, Routes} from "react-router-dom";
import FreeBoard from "./Freeboard/FreeBoard";
import LcKboard from "./LCK/LCKboard";
import Solution from "./solution/Solution";
import RequestBoard from "./ requestBoard/RequestBoard";
import BoardHeader from "./BoardHeader";

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