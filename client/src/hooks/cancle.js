import React, {useState} from 'react';
import '../style/style.scss';
import {Link} from 'react-router-dom';

const Cancle = (props) => {
    
    const {close} = props.close; //알림창을 열림&닫기
    const value = props.value; //알림창에 알림 내용

    return(
        <div className='window'>
            <div className='alert cancle'>
                <img src={process.env.PUBLIC_URL+'/images/alert.png'} alt='alert_Image' className='logoImg'/>
                <p style={{whiteSpace: 'pre-wrap'}}>{value}</p>
                <div>
                    <button className='cancleBtn' onClick={()=>{props.close(false)}}>돌아가기</button>
                    <Link to="/" className='addLink'>
                    <button className='cancleBtn'>나가기</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cancle;