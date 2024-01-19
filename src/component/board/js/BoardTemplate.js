import React from 'react';
import BoardHeader from "./Board_header";
import {Route, Routes} from "react-router-dom";
import Board from "./Board";
import BoardCreate from "./BoardCreate";

const BoardTemplate = () => {
    return (
        <>
            <BoardHeader/>
            <Routes>
                <Route path={'/main'} element={<Board />}/>
                <Route path={'/create'} element={<BoardCreate />} />
            </Routes>
        </>
    );
};

export default BoardTemplate;