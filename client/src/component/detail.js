import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Cancle from '../hooks/cancle';
import '../style/style.scss';
import { Link } from 'react-router-dom';
import Choice from '../hooks/choice';
import axios from 'axios';
import QueryString from 'querystring';
import Alert2 from '../hooks/alert2';

const Detail = () => {

    let location = useLocation(); //router 값을 받아옴.

    const [cancleModal, setCancleModal] = useState(false); // 나가기
    const [alertValue, setAlertValue] = useState('');

    const [choiceModal, setChoiceModal] = useState(false); //삭제 모달
    const [erase, setErase] = useState(false); //선택 삭제

    const [alert, setAlert] = useState(false); //삭제 완료 모달
    const [deleteValue, setDeleteValue] = useState('');

    useEffect(() => {

        if(erase === 'yes') Delete();
    
    }, [erase]);


    const Delete = () => { //해당 메모장 삭제 함수
        axios({
            method:'post', //method: 데이터 통신하는 방식
            url:'https://tjddus0630.cafe24.com/sy_memo/ajax/text_delete.php',
            data:QueryString.stringify({email:sessionStorage.getItem("loginEmail"), date:location.state.date}),
        })
        .then(res => res.data)
        .then(data => {
            if(data){ //삭제가 완료됨.
                setAlert(true);
                setDeleteValue(data);
            }
            else{ //삭제 실패
                
            }
        })
    }


    return(
        <div className='Content'>
            <div className='memo'>
                <form>
                    <label>제목</label>
                        <p className='title'>{location.state.title}</p><br/><br/>
                    <label>내용</label><br/><br/>
                        <p className='content'>{location.state.content}</p>
                    <button type='button' className='detailBtn' onClick={()=>{setCancleModal(true); setAlertValue('현재 메모장을 나가겠습니까?')} }>나가기</button>
                    <button type='button' className='detailBtn' onClick={() => {setChoiceModal(true);}}>삭제</button>
                    
                    <Link to={'/update'} state={{title:location.state.title, content:location.state.title, date:location.state.date}} className='addLink'>
                        <button type='button' className='detailBtn'>수정</button>
                    </Link>
                </form>
            </div>
            {cancleModal === true? <Cancle close={setCancleModal} value={alertValue}/> : null}
            {choiceModal === true? <Choice close={setChoiceModal} value={'현재 메모장을 삭제하겠습니까?'} lock={setErase}/> : null} 
            {alert === true? <Alert2 close={setAlert} value={deleteValue} img={'/images/trash.png'}/> : null}
        </div>
    )
}

export default Detail;