import React from 'react';
import "../scss/SpectorMain.scss"
import SpectorItem from "./SpectorItem";
import {Reset} from "styled-reset";

const SpectorMain = ({spectorList}) => {
    return (
        <div className={'spector-container'}>
            <div className={'spector-form'}>
                <div className={'title-box'}>
                    <a>Pro Matches</a>
                </div>
                <ul className={'spector-lists'}>

                    <SpectorItem />
                    {/*{*/}
                    {/*    spectorList.map(spector => <SpectorItem*/}
                    {/*        */}

                    {/*        />)*/}
                    {/*}*/}
                </ul>
            </div>
        </div>
    );
};

export default SpectorMain;