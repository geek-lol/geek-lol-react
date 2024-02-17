import React, {useEffect, useState} from 'react';
import '../scss/BoardShorts.scss'
import Shorts_content from "./Shorts_content";
import {SHORT_URL} from "../../../../config/host-config";
import Shorts_header from "./Shorts_header";

const BoardShorts = () => {
    const [shortList, setShortList] = useState([]);
    const API_BASE_URL = SHORT_URL


    useEffect(() => {

        fetch(API_BASE_URL, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200){
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;

                // console.log(json);
                setShortList(json.shorts);
            });

    }, []);


    return (
        <div className={'short-container'}>
            <div className={'shorts-header-wrapper'}>
                <Shorts_header />
            </div>
            <ul className={'shorts-content-wrapper'}>
                {shortList.map((shorts) => (
                    <Shorts_content
                        id={shorts.shortsId}
                        item={shorts}
                        upVote={shorts.upCount}
                    />
                ))}
            </ul>
        </div>

    );



};

export default BoardShorts;