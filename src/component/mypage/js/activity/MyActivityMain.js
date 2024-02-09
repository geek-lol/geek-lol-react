import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyAcitivityComment from "./MyActivityComment";
const MyActivityMain = () => {
    return (
        <div className="my-activity-wrapper">
            <MyActivityBoard />
            <MyAcitivityComment />
            {/*<MyActivityReport />*/}
        </div>
    );
};

export default MyActivityMain;