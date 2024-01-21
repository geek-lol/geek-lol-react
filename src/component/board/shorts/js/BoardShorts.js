import React from 'react';
import '../scss/BoardShorts.scss'
import Shorts_header from "./Shorts_header";
import Shorts_content from "./Shorts_content";

const BoardShorts = () => {
    return (
        <div className={'short-container'}>
            <Shorts_header />
            <Shorts_content />
        </div>

    );



};

export default BoardShorts;