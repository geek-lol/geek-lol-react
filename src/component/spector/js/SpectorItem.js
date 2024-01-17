import React, {useRef, useState} from 'react';
import "../scss/SpectorItem.scss"

const SpectorItem = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();


    return (
        <>
        <li className={'spector-list'}>
            <div className={'spector-container'}>
                <div className={'team-box'}>
                    <div className={'t1-box'}>
                        <div className={'t1-name'}>
                            <a>
                            {/*  name박스  */}
                                name
                            </a>
                        </div>
                        <div className={'t1-img'}>
                        {/*  이미지박스  */}
                        </div>
                    </div>
                    <div className={'vs'}><a>VS</a></div>
                    <div className={'t2-box'}>
                        <div className={'t2-img'}>
                            {/*  이미지박스  */}
                        </div>
                        <div className={'t2-name'}>
                            <a>
                                {/*  name박스  */}
                                name
                            </a>
                        </div>
                    </div>
                </div>
                <div className={'spector-btns'}>
                    <div className={'sp-button'}>
                        <a>관전하기</a>
                    </div>
                    <div className={'sp-button modal-open-btn'} onClick={() => setModalOpen(true)}>
                        <a>자세히 보기</a>
                    </div>

                </div>
            </div>
        </li>

        {
            modalOpen &&
            <div className={'modal-container'} ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                    setModalOpen(false);
                }
            }}>
                <div className={'modal-item'}>
                    <div className={'t1-container'}>

                    </div>
                    <div className={'banpick-box'}>

                    </div>
                    <div className={'t2-container'}>

                    </div>
                </div>
            </div>

        }
        </>
    );
};

export default SpectorItem;