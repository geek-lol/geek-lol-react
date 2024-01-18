import React, {useState} from 'react';
import "../scss/Template.scss";
import {Route, Routes} from "react-router-dom";
import Login from "../../login/js/Login";
import Signup from "../../signup/js/Signup";
import Passwordreset from "../../passwordreset/js/Passwordreset";


const Template = () => {



    return (
        <div className={'wrapper'}>
            <form>
                <div className={'container blur'}>
                    <div className="logo_box"><img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="로고이미지"/></div>

                    <Routes>
                        {/*<Route path="/" element={<Login />}/>*/}
                        {/*<Route path="/" element={<Signup />}/>*/}
                        <Route path="/" element={<Passwordreset />}/>
                    </Routes>
                </div>
            </form>
        </div>
    );
};

export default Template;