import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SearchBox from "./SearchBox";
import '../scss/MenuModal.scss';
import cn from "classnames";
import Profile from "./Profile";
import {Link, useNavigate} from "react-router-dom";


const MenuModal = ({menu, isLogin,modalTouchHandler}) => {
    return (
        <>
            <div id='menuModal' className={cn("menuModal", {active: menu})}>
                <div className='modalBox'>
                    <SearchBox/>
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
                            <Link className="sign_in_a" to="/template/login">
                                <div className="sign_in_M">로그인</div>
                            </Link>
                            <Link className="sign_up_a" to="/template/signup">
                                <div className="sign_up_M">회원가입</div>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

MenuModal.propTypes = {};

export default MenuModal;