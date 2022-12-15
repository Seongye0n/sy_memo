import React, {useState} from 'react';
import '../style/style.scss';
import Alert from '../hooks/alert';

const Lock = (props) => { //잠금 장치 이용
    
    const [alertModal, setAlertModal] = useState(false); //비밀번호 4자리가 아닐 시 알림창 출력

    const [pw, setPw] = useState('');
    const pwRegEx = /^[0-9]{4}$/; //비밀번호는 숫자 4자리만 가능

    const handler = () => {
        if(pwRegEx.test(pw)){ //비밀번호 4자리 정상적으로 입력.
            props.pw(pw);
            props.close(false);
        }else{ //비밀번호 비정상 입력
            setAlertModal(true);
        }
    }

    return(
        <div className='alert lock'>
            <img src={process.env.PUBLIC_URL+'/images/lock.png'} alt='lock_img' className='logoImg'/>
            <p style={{whiteSpace: 'pre-wrap'}}>비밀번호(숫자 4자리)를 입력하세요.</p>
            <input style={{textAlign:'center'}} type='password' className='input' onChange={(e) => setPw(e.target.value)} value={pw}/>
            <br/><button onClick={()=>handler()}>저장하기</button>


            {alertModal === true? <Alert close={setAlertModal} value={'숫자 4자리를 입력하세요.'}
            styleWindow={{position: 'fixed'}} styleAlert={{height: '70%'}}/> : null}


        </div>
    )
}

export default Lock;