import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../style/style.scss';
import Alert from '../hooks/alert';
//import QueryString from 'querystring';

//로그인창
const Login = () => {

    const [joinModal, setJoinModal] = useState(false);

    return(
        <div className='window'>
            <div className='loginWindow'>
                <h1>LOGIN</h1>
                <form id='LoginForm' method='post'>
                    <input type='text' name='id' placeholder='ID (Email)' />
                    <input type='text' name='pw' placeholder='Password'/>
                    <label>
                        <input type='checkbox' id='remember-id'/> 아이디 저장하기 
                    </label>
                </form>
                <button className='loginBtn' type='submit' style={{float:'left'}}>로그인</button>
                <button className='loginBtn' type='button' style={{float:'right'}} onClick={()=>{setJoinModal(true)}}>회원가입</button>
                {joinModal === true? <Join close={setJoinModal} /> : null}
            </div>
        </div>  
    );
};

//회원가입창
const Join = (props) => {

    const {close} = props; //회원가입 창닫기
    const [alertModal, setAlertModal] = useState(false); //회원가입시 잘못된 입력알림창.
    const [alertValue, setAlertValue] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState(''); //비밀번호
    const [pwCheck, setPwCheck] = useState('');

    //정규식 체크
    const nameRegEx = /^[가-힣]+$/;
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
	const pwRegEx = /^[A-Za-z0-9]{8,20}$/;

    const [formCheck, setFormCheck] = useState({
        name:false,
        email: false, 
        pw: false,
        pwCheck: false,
    });

    const JoinAccess = () => { //회원가입 요청사항 확인 후 데이터 전달
        
        //이름, 이메일, pw 정규식 검사
        setFormCheck({...formCheck, name:nameRegEx.test(name), email:emailRegEx.test(email), pw:pwRegEx.test(pw), pwCheck:pw===pwCheck}); 
       
        if(formCheck.name && formCheck.email && formCheck.pw && formCheck.pwCheck){
            axios.post('https://tjddus0630.cafe24.com/sy_memo/ajax/ajax_join_update.php',{       // POST
                name: name,
                email: email,
                pw: pw,
            })
            .then(res => res.data)
            .then(data => {
                if(data.result){
                    setAlertModal('회원가입이 완료되었습니다.');
                }
                else{
                    setAlertModal('회원가입을 할 수 없습니다.');
                }
            }) //회원가입 성공여부
        }else if(!formCheck.name){
            setAlertModal(true);
            setAlertValue('사용할 수 없는 이름입니다.');
        }else if(!formCheck.email){
            setAlertModal(true);
            setAlertValue('사용할 수 없는 이메일입니다.');
        }else if(!formCheck.pw){
            setAlertModal(true);
            setAlertValue('사용할 수 없는 패스워드입니다.');
        }else{
            setAlertModal(true);
            setAlertValue('기존의 패스워드와 입력값이 다릅니다.');
        }
        
    }

    return(
        <div className='window'>
            <div className='joinWindow'>
                <h1>회원가입</h1>
                <form method='post' id='LoginForm' >
                    <input type='text' name='name' placeholder='이름' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <input type='text' name='email' placeholder='ID (Email)' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type='password' name='pw' placeholder='비밀번호' value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                    <p> * 비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요.</p>
                    <input type='password' name='pwcheck' placeholder='비밀번호 확인' onChange={(e)=>{setPwCheck(e.target.value)}} />
                </form>
                <button type='submit' className='joinBtn' style={{float:'left'}} onClick={()=>JoinAccess()}>회원가입</button>
                <button className='joinBtn' style={{float:'right'}} onClick={()=>{close(false)}}>취소</button>
                {alertModal === true? <Alert close={setAlertModal} value={alertValue}/> : null}
            </div>
        </div>
    );
};

export default Login;