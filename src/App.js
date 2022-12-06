import './App.css';
import {useState} from 'react';
import { BrowserRouter} from "react-router-dom";
import Header from './component/header';
import Login from './component/login';
import Add_memo from './component/add_memo';

function App() {
  
  const [loginModal, setLoginModal] = useState(true); 

  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <div className='Content'>
          {/* {loginModal === true? <Login close={setLoginModal}/> : null} */}
          <Add_memo/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;