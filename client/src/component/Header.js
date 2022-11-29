import React from 'react';
import styled from 'styled-components';
import {MobileSize} from '../style/screen.js';

const StyleHeader = styled.header`
    position: relative;
    width: 100%;
    height: 15vh;
    background-color:#8D93AB;
`;

const Header = () => {
    
    const mobile = MobileSize();

    const logo = {
        position:'absolute',
        width: mobile? '100%' : '30vw',
        height: '100%',
        textAlign: 'center'
    };
    const logoImg = {
        position: 'relative',
        height:'80%',
        top: '50%',
        transform: 'translateY(-50%)'
    };
    const logoH1 = {
        display: 'inline-block',
        position: 'relative',
        top:'-15%',
        marginLeft: '2%',
        fontSize: '1.85rem'
    }

    return(
        <StyleHeader>
            <div style={logo}>
                <img src={process.env.PUBLIC_URL+'../images/logo.png'} alt='logo' style={logoImg}/>
                <h1 style={logoH1}>MEMO</h1>
            </div> 
        </StyleHeader>
    )
};

export default Header;
