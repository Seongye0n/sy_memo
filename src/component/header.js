import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {MobileSize} from '../style/screen.js';

const StyleHeader = styled.header`
    position: relative;
    width: 100%;
    height:15vh;
    background-color:#8D93AB;
`;

const Header = (props) => {
    
    const mobile = MobileSize(); //모바일인지 확인하기
    const {loginCheck} = props; //로그인 확인 여부

    const [name, setName] = useState(''); //login 성공 후 name 확인

    useEffect(() => {
        if(sessionStorage.getItem("loginName")){ //세션에 로그인 이름을 담고 있으면
            setName('visible'); 
        }else{
            setName('none');
        }
    });

    const logo = {
        position:'absolute',
        width: '100%',
        height: '100%',
        textAlign: mobile? 'center':'left',
        left: mobile? null : '5%',
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
        fontSize: mobile? '1.3rem' : '1.85rem'

    }
    const nameSpan = {
        position: 'absolute',
        right:0,
        bottom: '5px',
        fontSize:mobile? '0.7rem': '1rem',
        fontWeight:'bolder',
        marginRight:mobile? '0px':'70px',
        display: name
    }
    const logout = {
        position: 'absolute',
        right:0,
        top: '5px',
        fontSize:mobile? '0.7rem': '1rem',
        fontWeight:'bolder',
        marginRight:mobile? '0px':'70px',
        display: name,
        border:'2px solid #F1F3F8',
    }

    const Logout = () => {
        sessionStorage.removeItem("loginName");
        loginCheck(false);
    }

    return(
        <StyleHeader style={{height: mobile? '10vh' : null }}>
            <div style={logo}>
                <img src={process.env.PUBLIC_URL+`/images/logo.png`} alt='logo' style={logoImg}/>
                <h1 style={logoH1}>MEMO</h1>
                { name === 'visible'?
                    <>
                        <button type='submit' style={logout} onClick={()=>Logout()}
                            onMouseOver={(e)=>{e.target.style.color='#393B44'; e.target.style.border='2px solid #393B44';}}
                            onMouseOut={(e)=>{e.target.style.color='#F1F3F8'; e.target.style.border='2px solid #F1F3F8';}}>LogOut</button>
                        <span style={nameSpan}>{sessionStorage.getItem("loginName")}님의 메모장</span>
                    </>
                    :
                    null
                }
            </div> 
        </StyleHeader>
    )
};

export default Header;
