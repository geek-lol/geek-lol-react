import React, {useState} from 'react';
import SpectorMain from "./SpectorMain";
import "../scss/SpectorTemplate.scss"

const SpectorTemplate = () => {

    const [spectorList, setSpectorList] = useState();

    return (
        <SpectorMain spectorList={spectorList}/>
    );
};

export default SpectorTemplate;