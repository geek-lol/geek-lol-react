import React, {useEffect, useState} from 'react';
import Header from "../../header/js/Header";
import '../scss/main.scss';
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Input = ({onSubmit, ...rest})=> {
    return (
        <form onSubmit={onSubmit} className={"input-form"} >
            <input {...rest} className={"title"} placeholder={"소환사명을 입력해주세요"}/>
            <button><FaSearch className='a'/></button>
        </form>
    )
}
const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [splitValue, setSplitValue] = useState(['', 'KR1']);
    const navigate = useNavigate();

    useEffect(() => {
        if(splitValue[0] !== '') {
            console.log(splitValue);
            navigate(`/find/${splitValue[0]}/${splitValue[1]}`);
        }
    }, [splitValue, navigate]);

    const handleChange = e => {
        setInputValue(e.target.value);
    };
    const handleSubmit = e => {
      e.preventDefault();
      const splitInput = inputValue.split('#');
      if(!splitInput[0]) {
          alert('소환사명을 입력해주세요.');
          return;
      }

      var regex = /^[가-힣]{2}$/;
      var characters = splitInput[0].split('');

      if(regex.test(splitInput[0])) {
          var stringWithSpaces = characters.join(' ');

          setSplitValue([stringWithSpaces, splitInput[1] ? splitInput[1] : 'KR1']);
      } else {
          setSplitValue([splitInput[0], splitInput[1] ? splitInput[1] : 'KR1']);
      }

    };
    return (
        <>

            <div className='mainBox'>
                <div className='main__Title'>
                    <div className='title__logo'>
                        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지" className={"logo-image"} />
                    </div>
                </div>
                <div className='input__Title'>
                    <Input value={inputValue} onChange={handleChange} onSubmit={handleSubmit}/>
                    {/*<FaSearch className='a'/>*/}
                </div>
            </div>

        </>
    );
};

export default Main;