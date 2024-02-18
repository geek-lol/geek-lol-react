import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyActivityComment from "./MyActivityComment";

const MyActivityTrollTemplate = () => {
    return (
        <div>
            <MyActivityBoard />
            <MyActivityComment />
        </div>
    );
};

export default MyActivityTrollTemplate;