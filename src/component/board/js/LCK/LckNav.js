import React from 'react';
import '../../scss/LckNav.scss';
const LckNav = () => {
    return (
        <nav className="logo-nav">
            <ul className="logo-BtnBox">
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/T1.png'} alt=""/><span>T1</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/GenG.png'} alt=""/><span>Gen.G</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/drx.png'} alt=""/><span>DRX</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/hanwha.png'} alt=""/><span>Hanwha Life Esports</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/kt.png'} alt=""/><span>kt Rolster</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/NS.png'} alt=""/><span>NongShim REDFORCE</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/SendBox.png'} alt=""/><span>FearX</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/KD.png'} alt=""/><span>Kwangdong Freecs</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/BR.jpg'} alt=""/><span>OKSavingsBank BRION</span></button></li>
                <li><button><img src={process.env.PUBLIC_URL+'/assets/TeamLogo/DK.jpg'} alt=""/><span>Dplus Kia</span></button></li>
            </ul>
        </nav>
    );
};

export default LckNav;