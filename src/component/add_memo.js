import React, {useState} from 'react';
import '../style/style.scss';
import { Link } from 'react-router-dom';

const Add_memo = () => {


    return(
        <div className='Content'>
            <div className='memoFlex'>
                <div className='memoItem'>
                    <Link to="/write" className='addLink'>
                        <img src={process.env.PUBLIC_URL+`/images/add.png`} alt='memo_add' className='addImg'/>
                        <span>메모 추가</span>
                    </Link>
                </div>
                <div className='memoItem'></div>
                <div className='memoItem'></div>
            </div>
        </div>
    )
}

export default Add_memo;