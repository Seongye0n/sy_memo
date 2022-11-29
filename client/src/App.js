import './App.css';
import Header from './component/header';
import Login from './component/login';

function App() {
  
  return (
    <div className='App'>
      <Header/>
      <div className='Content'>
        <Login/>
      </div>
    </div>
  );
}

export default App;