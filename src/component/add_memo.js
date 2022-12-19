import React, {useEffect, useState} from 'react';
import '../style/style.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QueryString from 'querystring';
import Unlock from './unlock';

const Add_memo = () => {

    //user의 저장된 메모 갯수
    const [count, setCount] = useState(0);
    //user 1행의 데이터 저장
    const [userLists, setUserLists] = useState([
        {date: '', title: '', content: '', lock: ''},
    ]);

    //비밀번호 잠금 모달
    const [unlockModal, setUnlockModal] = useState(false);
    const [lockPw, setLockPw] = useState(''); //lock 비밀번호
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState();
    
    useEffect(()=>{
        memoData();
    },[]);

    const memoData = () => {
        if(sessionStorage.getItem('loginEmail')){ //로그인 완료 상태
            axios({
                method:'post', 
                url:'https://tjddus0630.cafe24.com/sy_memo/ajax/text_select.php',
                data:QueryString.stringify({email:sessionStorage.getItem('loginEmail')}),
            })
            .then(res => res.data)
            .then(data => {
                if(data){ //저장된 메모가 있는 경우
                    
                    //서버 데이터 행의 갯수
                    setCount(data.length);

                    //_inputData는 서버 n번째 행의 데이터를 저장함.
                    const _inputData = data.map((rowData) => (
                        {
                            date: rowData.date,
                            title: rowData.title,
                            content: rowData.contents,
                            lock: rowData.lock
                        }
                    ))
                    //저장된 것을 그대로 보존하고, inputData를 추가적으로 setUserLists에 저장함
                    //기존의 값을 지우고, 변경된 데이터만 저장함.
                    setUserLists(userLists.concat(_inputData));

                }else{ //저장된 메모가 없음.
                    
                }
            })
        }
        else{ //로그아웃 상태

        }
        
    }


    //잠금된 메모를 클릭시
    const lockClick = (lock, title, content, date) => {
        //해당 메모의 비밀번호를 받아옴.
        setLockPw(lock);
        setTitle(title);
        setContent(content);
        setDate(date);
        //비밀번호 입력창 열림
        setUnlockModal(true);
    }

    return(
        <div className='Content'>
            {sessionStorage.getItem('loginName')? 
                <div className='memoFlex'>
                    <div className='memoItem'>
                        <Link to="/write" className='addLink'>
                        <img src={process.env.PUBLIC_URL+`/images/add.png`} alt='memo_add' className='addImg'/>
                        <span>메모 추가</span>
                        </Link>
                    </div>
                    {count === 0 ? //저장된 메모장 여부
                        null
                    :
                        userLists.map((data, index) => {
                            return(
                                index === 0? //0번째 index는 출력하지 않음
                                    null 
                                : 
                                    data.lock === ''? //잠금된 메모장인지 확인
                                        <div className='memoItem' key={index}>
                                            <Link to={'/detail'} state={{title:data.title, content:data.content, date:data.date }} className='addLink'>
                                            <div className='itemStyle'>
                                                <div className='itemTitle'>{data.title}</div>
                                                <div className='itemContent'>{data.content}</div>
                                            </div>
                                            </Link>
                                        </div>
                                    : //잠금된 메모장 출력
                                        <div className='memoItem' key={index} onClick={()=>{lockClick(data.lock, data.title, data.content, data.date)}}>
                                            <div className='itemStyle'>
                                                <img src={process.env.PUBLIC_URL+`/images/lock.png`} alt='memo_lock' className='addImg lockImg'/>
                                            </div>
                                        </div>
                            )
                        })//userLsists.map return
                    }
                {unlockModal === true? <Unlock close={setUnlockModal} lock={lockPw} title={title} content={content} date={date}/> : null} 
                </div> //메모장Item Div
            :
                null //로그인 상태 확인
            }       
        </div>
    )
}

export default Add_memo;