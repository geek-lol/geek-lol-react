import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CiSearch} from "react-icons/ci";
import {RxCross2} from "react-icons/rx";

const SearchBox = props => {
    const [inputData,setInputData] = useState("");
    const [data,setData] = useState("");
    //가져온 데이터 저장
    const inputSend=()=> {
        setData(inputData);
        console.log(data);
    }
    //인풋데이터 가져오기
    const inputSave=(e) =>{
        setInputData(e.target.value);
    }

    return (
        <>
            <div className="input__box">
                <div className="searchBox">
                    <input type="text" className="input" placeholder="소환사명을 입력해주세요" onChange={inputSave}/>
                    {/*<RxCross2 className="crossI" size={24}/>*/}
                    <button type="submit" onClick={inputSend}>
                        <CiSearch className="searchI" size={24}/>
                    </button>
                </div>
            </div>
        </>
    );
};

SearchBox.propTypes = {};

export default SearchBox;