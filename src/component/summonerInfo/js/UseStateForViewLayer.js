import React, {useState} from 'react';

const UseStateForViewLayer = (size) => {
    const [viewFirstSpell, setViewFirstSpell] = useState(Array(size).fill(false));
    const [viewSecondSpell, setViewSecondSpell] = useState(Array(size).fill(false));
    const [viewMainRune, setViewMainRune] = useState(Array(size).fill(false));
    const [viewSubRune, setViewSubRune] = useState(Array(size).fill(false));

    return [viewFirstSpell, setViewFirstSpell, viewSecondSpell, setViewSecondSpell, viewMainRune, setViewMainRune, viewSubRune, setViewSubRune];
};

export default UseStateForViewLayer;