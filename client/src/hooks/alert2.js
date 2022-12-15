import React from 'react';
import '../style/style.scss';
import {Link} from 'react-router-dom';

// alert와 alert2는 디자인이 다름.
const Alert2 = (props) => {

    return(
        <div className='window'>
            <div className='alert alert2'>
                <img src={process.env.PUBLIC_URL+props.img} alt='alert_Image' className='logoImg'/>
                <p>{props.value}</p>
                {props.img === '/images/confirmed.png'? 
                    <Link to="/" className='addLink addLink2'> <button>확인</button> </Link>
                    :
                    <button onClick={()=> props.close(false)}>확인</button>
                }
            </div>
        </div>
    )
}

export default Alert2;