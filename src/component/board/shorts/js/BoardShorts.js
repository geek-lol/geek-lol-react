import React, {useEffect, useState} from 'react';
import '../scss/BoardShorts.scss'
import Shorts_content from "./Shorts_content";
import {SHORT_URL} from "../../../../config/host-config";
import Shorts_header from "./Shorts_header";
import cn from "classnames";
import {BsCameraVideoOff} from "react-icons/bs";

const BoardShorts = () => {
    const [shortList, setShortList] = useState([]);
    const [error, setError] = useState(true); // 에러 상태 추가
    const API_BASE_URL = SHORT_URL


    useEffect(() => {
        console.log(shortList);

        fetch(API_BASE_URL, {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;

                setShortList(json.shorts);
                setError(false);
                // console.log(json);
            })
            .catch(error => {
                console.log(error);

            });

    }, []);




    return (
        <div className={'short-container'}>
            <div className={'shorts-header-wrapper'}>
                <Shorts_header/>
            </div>
            {error ? (
                <div className={'short-form'} id={'root'}>
                    <div className={'content'}>
                        <div className={'video-box'}>
                            <BsCameraVideoOff className={'error-icon'}/>
                            <div className={'error-msg'}>업로드된 영상이 없습니다!</div>
                        </div>
                    </div>
                </div>

            ) : (
                <ul className={'shorts-content-wrapper'}>

                    {shortList.map((shorts) => (
                        <Shorts_content
                            id={shorts.shortsId}
                            item={shorts}
                            upVote={shorts.upCount}
                            error={error}
                        />
                    ))}
                </ul>

            )}
        </div>

    );


};

export default BoardShorts;