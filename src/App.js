import './App.css';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path = '/' element = {<HomePage />} />
      </Routes>
      <LoginForm/>
    </div>
  );
}

export default App;
