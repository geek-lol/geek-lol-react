import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from "./SearchBox";
import '../scss/MenuModal.scss';
import cn from "classnames";
import Profile from "./Profile";

const MenuModal = ({menu, isLogin, isProfile}) => {
    console.log(isLogin)
    return (
        <>
            <div id='menuModal' className={cn("menuModal", {active: menu})}>
                <div className='modalBox'>
                    <SearchBox/>
                    <a className='modalContent' href="#">홈</a>
                    <a className='modalContent' href="#">랭킹</a>
                    <a className='modalContent' href="#">게시판</a>
                    <a className='modalContent' href="#">챔피언 분석</a>
                </div>
                <div className="infoBox">
                    {isLogin === true &&
                        <>
                            <a className="sign_in_a">
                                <div className="sign_in_M">로그인</div>
                            </a>
                            <a className="sign_up_a">
                                <div className="sign_up_M">회원가입</div>
                            </a>
                        </>
                    }

                    {isProfile === true && <a className="profile_a"><Profile/></a>}
                </div>
            </div>
        </>
    );
};

MenuModal.propTypes = {};

export default MenuModal;