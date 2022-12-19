import './App.css';
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './component/header';
import Login from './component/login';
import Add_memo from './component/add_memo';
import Write from './component/write.js';
import Detail from './component/detail.js';
import Update from './component/update.js';

function App() {

  const [loginCheck, setLoginCheck] = useState(false); //로그인 여부


  return (
    <div className='App'>
      <Header loginCheck={setLoginCheck}/>
          {/* loginCheck가 true이면 로그인창 안나옴. [loginCheck] false && session 유지 X => 로그인창나옴.  */}
          {loginCheck === true? null : sessionStorage.getItem('loginName')? null: <Login close={setLoginCheck}/>}
      <Routes>
          <Route path='/' element={<Add_memo/>}/>
          <Route path='/write' element={<Write/>}/>
          <Route path='/detail' element={<Detail/>}/>
          <Route path='/update' element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;