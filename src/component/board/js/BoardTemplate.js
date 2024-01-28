import React, {useEffect, useState} from 'react';
import BoardHeader from "./Board_header";
import {Route, Routes, useLocation} from "react-router-dom";
import Board from "./Board";
import BoardCreate from "./BoardCreate";
import BoardShorts from "../shorts/js/BoardShorts";
import Header from "../../header/js/Header";
import Detail from "./Detail";
import ShortCreateMain from "../shorts/shortCreate/js/ShortCreateMain";


const BoardTemplate = () => {

    return (
        <>
            <Routes>
                <Route path={'/main'} element={<Board />}/>

                <Route path={'/create'} element={<BoardCreate />} />
                <Route path={'/shorts'} element={<BoardShorts />} />
                <Route path={'/sc'} element={<ShortCreateMain />}/>
                <Route path={'/detail'} element={<Detail />}/>
                {/*<Route path={'/main'} />*/}
            </Routes>
        </>
    );
};

export default BoardTemplate;