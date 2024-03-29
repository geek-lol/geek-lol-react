import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Board from "./Board";
import BoardCreate from "./BoardCreate";
import BoardShorts from "../shorts/js/BoardShorts";
import Detail from "./Detail";
import LCKBoard from "./LCK/LCKContent";
import ShortCreateMain from "../shorts/shortCreate/js/ShortCreateMain";
import RequestBoard from "./ requestBoard/RequestBoard";
import Modify from "./Modify";
import RequestDetail from "./ requestBoard/RequestDetail";
import RequestCreate from "./ requestBoard/RequestCreate";
import SelectDetail from "./ requestBoard/selectDetail";

const BoardTemplate = ({touch}) => {

    return (
        <>
            <Routes>
                <Route path={'/main/*'} element={<Board touch={touch} />}/>
                <Route path={'/create'} element={<BoardCreate />} />
                <Route path={'/RequestCreate'} element={<RequestCreate />} />
                <Route path={'/modify'} element={<Modify />} />
                <Route path={'/shorts'} element={<BoardShorts />} />
                <Route path={'/sc'} element={<ShortCreateMain />}/>
                <Route path={'/detail/:Id'} element={<Detail />}/>
                <Route path={'/lckBoard'} element={<LCKBoard />}/>
                <Route path={'/Request'} element={<RequestBoard/>}/>
                <Route path={'/RequestDetail/:id'} element={<RequestDetail/>}/>
                <Route path={'/SelectDetail'} element={<SelectDetail/>}/>


                {/*<Route path={'/main'} />*/}
            </Routes>
        </>
    );
};

export default BoardTemplate;