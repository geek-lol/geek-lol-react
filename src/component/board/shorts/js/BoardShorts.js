import React from 'react';
import '../scss/BoardShorts.scss'
import Shorts_header from "./Shorts_header";
import Shorts_content from "./Shorts_content";

const BoardShorts = () => {
    return (
        <div className={'short-container'}>
            <div className={'shorts-header-wrapper'}>
                <Shorts_header />
            </div>
            <ul className={'shorts-content-wrapper'}>
                <Shorts_content />
            </ul>
        </div>

    );



};

export default BoardShorts;