import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import '../style/style.scss';
import axios from 'axios';
import QueryString from 'querystring';
import Alert2 from '../hooks/alert2';

const Update = () => {

    let location = useLocation();

    const [title, setTitle] = useState(`${location.state.title}`);
    const [content, setContent] = useState(`${location.state.content}`);
    const date = location.state.date;

    const [alert, setAlert] = useState(false);
    const [alertValue, setAlertValue] = useState('');
    const [alertImg, setAlertImg] = useState('')


    const update = () => { //데이터 변경하기

        axios({
                 method:'post', //method: 데이터 통신하는 방식
                 url:'https://tjddus0630.cafe24.com/sy_memo/ajax/text_update.php',
                 data:QueryString.stringify({email:sessionStorage.getItem("loginEmail"), title:title, content:content, date:date}),
             })
         .then(res => res.data)
         .then(data => {
             if(data){ //업데이트 완료
                setAlert(true);
                setAlertValue(data);
                setAlertImg('/images/confirmed.png');
             }
             else{ //저장 실패
                 
             }
         })
     }



    return(
        <div className='Content'>
            <div className='memo'>
                <form>
                    <label>제목</label>
                        <input type='text' className='input' placeholder='메모장의 제목을 입력하세요.'
                        onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                    <label>내용</label> 
                        <textarea className='inputText' placeholder='메모장의 내용을 입력하세요.'
                        onChange={(e) => {setContent(e.target.value)}} value={content}/>
                    <button onClick={()=>update()} type='button' style={{left:'50%', tranform:'translateX(-50%)'}}>저장</button>
                </form>
            </div>
            {alert === true? <Alert2 close={setAlert} value={alertValue} img={alertImg}/> : null}
        </div>
    )
}

export default Update;