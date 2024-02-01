import React from 'react';
import "../scss/NotFoundSummoner.scss";
import Header from "../../header/js/Header";

const NotFoundSummoner = ({searchValue, tag}) => {
    return (
        <>
            <div className="not-found-box">
                <div className="not-found-container">
                    <div className="not-found-title">
                        <span>Not Found Summoner</span>
                    </div>
                    <div className="not-found-value">
                    "{searchValue}#{tag}"
                    </div>
                    <span className={"not-found-description"}>등록되지 않은 소환사명입니다.</span>
                    <span className="not-found-description">닉네임 혹은 태그를 확인해주세요.</span>

                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="로고이미지"/>
                </div>
            </div>
        </>
    );
};

export default NotFoundSummoner;