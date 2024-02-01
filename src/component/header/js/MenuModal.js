import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SearchBox from "./SearchBox";
import '../scss/MenuModal.scss';
import cn from "classnames";
import Profile from "./Profile";
import {Link, useNavigate} from "react-router-dom";


const MenuModal = ({menu, isLogin,modalTouchHandler}) => {
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
        setSplitValue([splitInput[0], splitInput[1] ? splitInput[1] : 'KR1']);
    };

    return (
        <>
            <div id='menuModal' className={cn("menuModal", {active: menu})}>
                <div className='modalBox'>
                    <SearchBox value={inputValue} onChange={handleChange} onSubmit={handleSubmit}/>
                    <Link to="/board/main/FreeBoard" className="modalContent c1"
                          onClick={modalTouchHandler}>자유게시판</Link>
                    <Link to="/board/main/LCK" className="modalContent c2"
                          onClick={modalTouchHandler}>LCK</Link>
                    <Link to="/board/main/Solution" className="modalContent c3"
                          onClick={modalTouchHandler}>공략게시판</Link>
                    <Link to="/" className="modalContent c4"
                          onClick={modalTouchHandler}>하이라이트</Link>
                </div>
                <div className="infoBox">
                    {isLogin ? <Profile/>
                        : <>
                            <a className="sign_in_a">
                                <div className="sign_in_M">로그인</div>
                            </a>
                            <a className="sign_up_a">
                                <div className="sign_up_M">회원가입</div>
                            </a>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

MenuModal.propTypes = {};

export default MenuModal;