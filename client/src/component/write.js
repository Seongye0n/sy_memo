import React, {useEffect, useState} from 'react';
import '../style/style.scss';
import Cancle from '../hooks/cancle';
import Choice from '../hooks/choice';
import Alert2 from '../hooks/alert2';
import Lock from '../hooks/lock';
import axios from 'axios';
import QueryString from 'querystring';


const Write = () => {

    const [alert, setAlert] = useState(false);  //알림창 모달
    const [cancleModal, setCancleModal] = useState(false); //나가기 모달
    const [choice, setChoice] = useState(false); //저장확인 모달

    const [alertValue, setAlertValue] = useState(''); //알림창 내용
    const [alertImg, setAlertImg] = useState(''); //알림창마다 이미지 변경
    

    const[title, setTitle] = useState(''); //제목 입력
    const [content, setContent] = useState('');  //내용 입력
    const [pw, setPw] = useState(''); //비밀번호

    
    const [lock, setLock] = useState(''); //잠금 여부 확인
    const [lockOpen, setLockOpen] = useState(false);
    

    useEffect(() => {
        
        if(lock === 'no') Save();
        else if( lock === 'yes' && pw === '') openlock(); 
        else if(lock === 'yes' && pw !== '') Save();

        
    }, [lock, pw]);

    const SaveCheck = () => { //제목, 내용 입력 확인

        if( title !== '' && content !== ''){ //제목, 내용 모두 빈공간이 아닐 때
            setChoice(true);
        }else if(title === ''){ //제목 미입력
            setAlert(true);
            setAlertValue('제목을 입력해주세요.');
            setAlertImg('/images/alert.png');
        }else{ //내용 미입력
            setAlert(true);
            setAlertValue('내용을 입력해주세요.');
            setAlertImg('/images/alert.png');
        }
    }

    function openlock(){
        setLockOpen(true);
    }


    const Save = () => { //저장

       axios({
                method:'post', //method: 데이터 통신하는 방식
                url:'https://tjddus0630.cafe24.com/sy_memo/ajax/text_save.php',
                data:QueryString.stringify({email:sessionStorage.getItem("loginEmail"), title:title, content:content, lock:pw}),
            })
        .then(res => res.data)
        .then(data => {
            if(data){ //저장 완료
                setAlert(true);
                setAlertValue(data);
                setAlertImg('/images/confirmed.png');
            }
            else{ //저장 실패
                setAlert(true);
                setAlertValue('저장을 실패하였습니다.');
                setAlertImg('/images/alert.png');
            }
        })
    }


    return(
        <div className='Content'>
            <div className='memo'>
                <form>
                    <label>제목</label>
                        <input type='text' className='input' placeholder='메모장의 제목을 입력하세요.'
                        onChange={(e)=>{setTitle(e.target.value)}}/>
                    <label>내용</label> 
                        <textarea className='inputText' placeholder='메모장의 내용을 입력하세요.'
                        onChange={(e) => {setContent(e.target.value)}}/>
                    <button type='button' onClick={()=>{SaveCheck();}}>저장</button>
                    <button type='button' onClick={()=>{setCancleModal(true); setAlertValue('작성 중인 페이지가 있습니다.\n 페이지를 나가겠습니까?')} }>취소</button>
                </form>
            </div>
            {cancleModal===true? <Cancle close={setCancleModal} value={alertValue}/> : null} 
            {alert === true? <Alert2 close={setAlert} value={alertValue} img={alertImg}/> : null}
            {choice === true? <Choice close={setChoice} value={'해당 메모에 잠금을 할까요?'} lock={setLock}/> : null}
            {lockOpen === true? <Lock close={setLockOpen} pw={setPw}/> : null}
        </div>
    )
}

export default Write;