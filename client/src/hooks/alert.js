import React from 'react';
import '../style/style.scss';

const Alert = (props) => {
    
    const {close} = props.close;
    const value = props.value;

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