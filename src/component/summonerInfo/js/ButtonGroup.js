import React, { useState } from 'react';

const ButtonGroup = ({buttonData, onButtonClick}) => {
    const [activeButton, setActiveButton] = useState(buttonData[0].id);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId.id);
        if (onButtonClick) {
            onButtonClick(buttonId.id);
        }

        console.log(buttonId)
    };

    const renderButtons = () => {

        return buttonData.map((button) => (
            <button
                key={button.id}
                onClick={() => handleButtonClick(button)}
                disabled={activeButton === button.id}
                className={`select-btn ${activeButton === button.id ? 'clicked' : ''}`}
            >
                {button.label}
            </button>
        ));
    };

    return (
        <div className={"btn-box"}>
            {renderButtons()}
        </div>
    );
};

export default ButtonGroup;
