import React from 'react';
import '../style/style.scss';

//로그인창
const Login = () => {

    return(
        <div className='window'>
            <div className='loginWindow'>
                <h1>LOGIN</h1>
                <form id='LoginForm'>
                    <input type='text' name='id' placeholder='ID (Email)' />
                    <input type='text' name='pw' placeholder='Password'/>
                    <label>
                        <input type='checkbox' id='remember-id'/> 아이디 저장하기 
                    </label>
                    <button type='submit'>로그인</button>
                    <button type='button'>회원가입</button>
                </form>
            </div>
        </div>
    );
};

//회원가입창
const Join = () => {

    return(
        <div className='window'>
            <div className='loginWindow'>
                <h1>회원가입</h1>
                <form id='LoginForm'>
                    <input type='text' name='name' placeholder='이름' />
                    <input type='text' name='id' placeholder='ID (Email)' />
                    <input type='text' name='pw' placeholder='비밀번호' />
                    <p> * 비밀번호 입력시 아래의 사항을 확인하여주세요.<br/>&nbsp; (5자 이상 / 대소문자, 특수문자, 숫자 포함)</p>
                    <input type='text' name='pw' placeholder='비밀번호 확인'/>
                    <button type='submit' className='joinBtn'>회원가입</button>
                </form>
            </div>
        </div>
    );
};

export {Login, Join};