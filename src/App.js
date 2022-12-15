import './App.css';
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './component/header';
import Login from './component/login';
import Add_memo from './component/add_memo';
import Write from './hooks/write.js';

function App() {

  const [loginCheck, setLoginCheck] = useState(false); //로그인 여부

  return (
    <div className='App'>
      <Header loginCheck={setLoginCheck}/>
          {loginCheck === true? null : <Login close={setLoginCheck}/>}  {/* 로그인되지 않았을 때, 로그인창 보임 */}
      <Routes>
          <Route path='/' element={<Add_memo/>}/>
          <Route path='/write' element={<Write/>}/>
      </Routes>
    </div>
  );
}

export default App;