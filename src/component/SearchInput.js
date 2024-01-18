import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

// 분리된 Input 컴포넌트
const Input = ({onSubmit, ...rest}) => {
    return (
        <form onSubmit={onSubmit}>
            <input {...rest}/>
            <button type="submit">Submit</button>
        </form>
    )
}

const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [splitValue, setSplitValue] = useState(['', 'KR1']);
    const navigate = useNavigate();

    useEffect(() => {
        if (splitValue[0] !== '') {
            console.log(splitValue)
            navigate(`/find/${splitValue[0]}/${splitValue[1]}`);
        }
    }, [splitValue, navigate]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const splitInput = inputValue.split('#');
        if (!splitInput[0]) {
            alert('Please enter a value to search.');
            return;
        }
        setSplitValue([splitInput[0], splitInput[1] ? splitInput[1] : 'KR1']);
    };

    return (
        <>
            <Input value={inputValue} onChange={handleChange} onSubmit={handleSubmit}/>
            <div className={"test"}>ㅋㅋ 존나어렵네</div>
        </>
    );

};

export default SearchInput;