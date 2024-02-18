import React from 'react';
import "../scss/BanPick.scss"

const BanPick = () => {
    return (
        <div className={'banpick-border'}>
            <div className={'banpick-container'}>
                <div className={'bp-text-box'}>
                    <p>Ban Pick</p>
                </div>
                <div className={'team-banpick-box'}>
                    <div className={'t1-banpicks'}>
                        <ul>
                            <li className={'t1-banpick'}></li>
                            <li className={'t1-banpick'}></li>
                            <li className={'t1-banpick'}></li>
                            <li className={'t1-banpick'}></li>
                            <li className={'t1-banpick'}></li>
                        </ul>
                    </div>
                    <div className={'t2-banpicks'}>
                        <ul>
                            <li className={'t2-banpick'}></li>
                            <li className={'t2-banpick'}></li>
                            <li className={'t2-banpick'}></li>
                            <li className={'t2-banpick'}></li>
                            <li className={'t2-banpick'}></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BanPick;