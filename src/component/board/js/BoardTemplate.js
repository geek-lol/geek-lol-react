import React, {useEffect, useState} from 'react';
import BoardHeader from "./Board_header";
import {Route, Routes, useLocation} from "react-router-dom";
import Board from "./Board";
import BoardCreate from "./BoardCreate";
import BoardShorts from "./BoardShorts";
import Header from "../../header/js/Header";

const BoardTemplate = () => {

    return (
        <>
            <Routes>
                <Route path={'/main'} element={<Board />}/>
                <Route path={'/create'} element={<BoardCreate />} />
                <Route path={'/shorts'} element={<BoardShorts />} />
            </Routes>
        </>
    );
};

export default BoardTemplate;