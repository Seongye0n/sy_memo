import React from 'react';
import '../style/style.scss';

const Alert = (props) => {
    
    const {close} = props.close; //알림창을 열림&닫기
    const value = props.value; //알림창에 알림 내용

    return(
        <div className='window'>
            <div className='alert'>
                <img src={process.env.PUBLIC_URL+'/images/alert.png'} alt='alert_Image' className='logoImg'/>
                <p>{value}</p>
                <button onClick={()=>{props.close(false)}}>확인</button>
            </div>
        </div>
    )
}

export default Alert;