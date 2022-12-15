import React, {useState} from 'react';
import '../style/style.scss';
import Cancle from '../hooks/cancle';

const Write = () => {

    const [cancleModal, setCancleModal] = useState(false);
    const cancleText = '작성 중인 페이지가 있습니다.\n 페이지를 나가겠습니까?';

    return(
        <div className='Content'>
            <div className='memo'>
                <form>
                    <label>제목</label>
                        <input type='text' className='input' placeholder='메모장의 제목을 입력하세요.'/>
                    <label>내용</label> 
                        <textarea className='inputText' placeholder='메모장의 내용을 입력하세요.'/>
                    <button type="submit">저장</button>
                    <button type='button' onClick={()=>setCancleModal(true)}>취소</button>
                </form>
                {cancleModal===true? <Cancle close={setCancleModal} value={cancleText}/> : null}
            </div>
        </div>
    )
}

export default Write;