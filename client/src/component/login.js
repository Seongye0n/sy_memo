import React, {useState} from 'react';
import axios from 'axios';
import '../style/style.scss';
import Alert from '../hooks/alert';
import QueryString from 'querystring';

//로그인창
const Login = (props) => {
    const {close} = props;  //로그인 확인 여부

    const [alertModal, setAlertModal] = useState(false); //로그인시 잘못된 입력 알림창.
    const [alertValue, setAlertValue] = useState(''); //로그인시 잘못된 입력 알림 내용값.

    const [joinModal, setJoinModal] = useState(false); //회원가입 창 열기&닫기

    const [email, setEmail]=useState('');
    const [pw, setPw]=useState('');

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const [formCheck, setFormCheck] = useState({
        email: false, 
        pw: false,
    });

    let sessionStorage = window.sessionStorage; //세션으로 저장.

    const LoginCheck = () => {
        if(formCheck.email === false){ //이메일 형식이 아닐 때
            setAlertModal(true);
            setAlertValue('잘못된 이메일입니다.');
        }else if(formCheck.pw === false){ // 패스워드 입력을 안했을 때
            setAlertModal(true);
            setAlertValue('비밀번호를 입력하여 주세요.');
        }else{ //로그인 접속 허용 검사
            axios({
                method:'post', //method: 데이터 통신하는 방식
                url:'https://tjddus0630.cafe24.com/sy_memo/ajax/login.php',
                data:QueryString.stringify({email:email, pw:pw}),
            })
            .then(res => res.data)
            .then(data => {
                if(data.result === true){ //로그인 성공시
                    close(true);
                    sessionStorage.setItem("loginName", data.name); //로그인 성공 후 이름 저장
                    sessionStorage.setItem("loginEmail", data.email); //로그인 성공 후 이메일 저장
                }else{ //없는 아이디 또는 비밀번호 일치 확인함
                    setAlertModal(true);
                    setAlertValue(data.msg);
                }
            }) //로그인 성공여부
        }
    }

    return(
        <div className='window'>
            <div className='loginWindow'>
                <h1>LOGIN</h1>
                <form id='LoginForm' method='post'>
                    <input type='text' name='email' placeholder='ID (Email)' value={email}
                        onChange={(e)=>{setEmail(e.target.value)
                            if(emailRegEx.test(email)) setFormCheck({...formCheck, email:true})
                            else setFormCheck({...formCheck, email:false})
                        }}/>
                    <input type='password' name='pw' placeholder='Password' value={pw}
                        onChange={(e)=>{setPw(e.target.value)
                            if(e.target.value !== '') setFormCheck({...formCheck, pw:true})
                            else setFormCheck({...formCheck, pw:false})
                        }}/>
                </form>
                <button className='loginBtn' type='submit' style={{float:'left', marginTop:'30px'}} onClick={()=>LoginCheck()}>로그인</button>
                <button className='loginBtn' type='button' style={{float:'right', marginTop:'30px'}} onClick={()=>{setJoinModal(true)}}>회원가입</button>
                {joinModal === true? <Join close={setJoinModal} /> : null}
                {alertModal === true? <Alert close={setAlertModal} value={alertValue}/> : null}
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
	const pwRegEx = /^[A-Za-z0-9]{7,20}$/;

    const [formCheck, setFormCheck] = useState({
        name:false,
        email: false, 
        pw: false,
        pwCheck: false,
    });

    const JoinAccess = () => { //회원가입 요청사항 확인 후 데이터 전달
       
        if(formCheck.name && formCheck.email && formCheck.pw && formCheck.pwCheck){
            axios({
                method:'post', //method: 데이터 통신하는 방식
                url:'https://tjddus0630.cafe24.com/sy_memo/ajax/join_update.php',
                data:QueryString.stringify({name:name, email:email, pw:pw}),
            })
            .then(res => res.data)
            .then(data => {
                if(data){
                    setAlertModal(true);
                    setAlertValue(data);
                }
                else{
                    close(false);
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
            setAlertValue('패스워드를 동일하게 입력하세요.');
        }
        
    }

    return(
        <div className='window'>
            <div className='joinWindow'>
                <h1>회원가입</h1>
                <form method='POST' id='LoginForm' >
                    <input type='text' name='name' placeholder='이름' value={name} 
                        onChange={(e)=>{setName(e.target.value)
                            if(nameRegEx.test(name)){setFormCheck({...formCheck, name:true})}
                            else setFormCheck({...formCheck, name:false})
                        }}/>
                    <input type='text' name='email' placeholder='ID (Email)' value={email} 
                        onChange={(e)=>{setEmail(e.target.value)
                            if(emailRegEx.test(email)) {setFormCheck({...formCheck, email:true})}
                            else setFormCheck({...formCheck, email:false})
                        }}/>
                    <input type='password' name='pw' placeholder='비밀번호' value={pw}
                        onChange={(e)=>{setPw(e.target.value)
                            if(pwRegEx.test(pw)) {setFormCheck({...formCheck, pw:true})}
                            else {setFormCheck({...formCheck, pw:false})}
                        }}/> 
                    <p> * 비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요.</p>
                    <input type='password' name='pwcheck' placeholder='비밀번호 확인' 
                        onChange={(e)=>{setPwCheck(e.target.value)
                            if(pw===e.target.value) {setFormCheck({...formCheck, pwCheck:true})}
                            else setFormCheck({...formCheck, pwCheck:false})
                         }}/>
                </form>
                <button type='submit' className='joinBtn' style={{float:'left'}} onClick={() => JoinAccess()}>회원가입</button>
                <button className='joinBtn' style={{float:'right'}} onClick={()=>{close(false)}}>취소</button>
                {alertModal === true? <Alert close={setAlertModal} value={alertValue}/> : null}
            </div>
        </div>
    );
};

export default Login;