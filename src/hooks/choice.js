import React from 'react';
import '../style/style.scss';

const Choice = (props) => { // 잠금 저장 선택창

    return(
        <div className='window'>
            <div className='alert cancle'>
                <img src={process.env.PUBLIC_URL+'/images/alert.png'} alt='alert_Image' className='logoImg'/>
                <p style={{whiteSpace: 'pre-wrap'}}>{props.value}</p>
                <div>
                    <button className='cancleBtn choiceBtn' onClick={()=>{props.lock('yes'); props.close(false);}}>예</button>
                    <button className='cancleBtn choiceBtn' onClick={()=>{props.lock('no'); props.close(false);}}>아니요</button> 
                </div>
            </div>
        </div>
    )
}


export default Choice;