import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../style/style.scss';
import Alert from '../hooks/alert';

const Unlock = (props) => {

    const [pw, setPw] = useState('');
    const pwRegEx = /^[0-9]{4}$/; //비밀번호는 숫자 4자리만 가능

    const [alertModal, setAlertModal] = useState(false); //잘못된 비밀번호 or 비밀번호 틀림
    const [alertValue, setAlertValue] = useState('');

    //비밀번호 일치 여부
    const [success, setSuccess] = useState(false);

    const handler = () => {
        if(pwRegEx.test(pw)){ //비밀번호 4자리 정상적으로 입력.
            if(props.lock === pw){ //DB 블로그와 입력한 비밀번호가 같으면
                setSuccess(true);
            }else{
                setAlertModal(true);
                setAlertValue('비밀번호가 다릅니다.')
            }         
        }else{ //비밀번호 비정상 입력
            setAlertModal(true);
            setAlertValue('숫자 4자리를 입력하세요.')
        }
    }

    return(        
        <div className='alert unlock' style={{zIndex:2}}>
            <img src={process.env.PUBLIC_URL+'/images/lock.png'} alt='lock_img' className='logoImg'/>
            <p style={{whiteSpace: 'pre-wrap'}}>비밀번호(숫자 4자리)를 입력하세요.</p>
            <input style={{textAlign:'center'}} type='password' className='input' onChange={(e) =>{setPw(e.target.value)}} value={pw}/>
                <br/>
            {props.lock === pw?
                <Link to={'/detail'} state={{title:props.title, content:props.content, date:props.date}} className='addLink'>
                    <button style={{marginRight:'10px'}}>확인</button>
                </Link>
            :
                <button onClick={()=>handler()} style={{marginRight:'10px'}}>확인</button>
            }
            <button onClick={()=>{props.close(false)}}>닫기</button>
            {alertModal === true? <Alert close={setAlertModal} value={alertValue} styleWindow={{position:'fixed'}} styleAlert={{height: '70%'}}/> : null}
        </div>
    )
}

export default Unlock;