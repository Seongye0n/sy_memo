import React, {useState} from 'react';
import '../style/style.scss';
import { Link } from 'react-router-dom';

const Add_memo = () => {


    return(
        <>
            <div className='memoFlex'>
                    <div className='memoItem' onClick='window.location.href="https://seongye0n.github.io/sy_memo/client/src/hooks/write.js"'>
                        <img src={process.env.PUBLIC_URL+`/images/add.png`} alt='memo_add' className='memoAdd'/>
                        <span className='memoAddSpan'>메모 추가</span>
                    </div>
                <div className='memoItem'></div>
                <div className='memoItem'></div>
            </div>
            <div className='memoFlex'>
                <div className='memoItem'></div>
                <div className='memoItem'></div>
                <div className='memoItem'></div>
            </div>
        </>
    )
}

export default Add_memo;