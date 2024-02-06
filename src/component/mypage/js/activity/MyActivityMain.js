import React from 'react';
import MyActivityBoard from "./MyActivityBoard";
import MyAcitivityComment from "./MyActivityComment";
// import MyActivityReport from "./MyActivityReport";
const MyActivityMain = () => {
    return (
        <div>
            <MyActivityBoard />
            <MyAcitivityComment />
            {/*<MyActivityReport />*/}
        </div>
    );
};

export default MyActivityMain;