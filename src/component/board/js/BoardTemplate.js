import React from 'react';
import BoardHeader from "./Board_header";
import {Route, Routes} from "react-router-dom";
import Board from "./Board";
import Detail from "./Detail";

const BoardTemplate = () => {
    return (
        <>
            <BoardHeader/>
            <Routes>
                <Route path={'/main'} element={<Board />}/>
                <Route path={'/detail'} element={<Detail />}/>
                {/*<Route path={'/main'} />*/}
            </Routes>
        </>
    );
};

export default BoardTemplate;