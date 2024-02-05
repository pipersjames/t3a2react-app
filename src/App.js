import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path='/create-new-user' element={<CreateAccount/>}/>
        <Route path ='/' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
