import React from 'react';
import "../scss/Team1ItemDetail.scss"

const Team1ItemDetail = () => {
    return (
        <div className={'t1-details-container'}>
            <div className={'t1-members'}>
                <ul>
                    {/* 따로 나눠서 li하나를 반복? */}
                    <li className={'t1-member'}>
                        <div className={'t1-tier'}><a></a></div>
                        <div className={'t1-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t1-img'}>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                            <div className={'user-img'}></div>
                        </div>

                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Team1ItemDetail;