import React from 'react';
import "../scss/Team2ItemDetail.scss"

const Team2ItemDetail = () => {
    return (
        <div className={'t2-details-container'}>
            <div className={'t2-members'}>
                <ul>
                    {/* 따로 나눠서 li하나를 반복? */}
                    <li className={'t2-member'}>
                        <div className={'t2-img'}>
                            <div className={'user-img'}></div>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                        </div>
                        <div className={'t2-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t2-tier'}><a></a></div>
                    </li>
                    <li className={'t2-member'}>
                        <div className={'t2-img'}>
                            <div className={'user-img'}></div>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                        </div>
                        <div className={'t2-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t2-tier'}><a></a></div>
                    </li>
                    <li className={'t2-member'}>
                        <div className={'t2-img'}>
                            <div className={'user-img'}></div>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                        </div>
                        <div className={'t2-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t2-tier'}><a></a></div>
                    </li>
                    <li className={'t2-member'}>
                        <div className={'t2-img'}>
                            <div className={'user-img'}></div>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                        </div>
                        <div className={'t2-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t2-tier'}><a></a></div>
                    </li>
                    <li className={'t2-member'}>
                        <div className={'t2-img'}>
                            <div className={'user-img'}></div>
                            <div className={'spell-img-box'}>
                                <div className={'spell-img'}></div>
                                <div className={'spell-img'}></div>
                            </div>
                        </div>
                        <div className={'t2-name'}>
                            <a className={'nickname'}>name</a>
                            <a className={'tag'}>#tag</a>
                        </div>
                        <div className={'t2-tier'}><a></a></div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Team2ItemDetail;