import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthChecker from './components/AuthChecker';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={(
          <>
            <AuthChecker/>
            <Navbar/>
            <Outlet/>
          </>
        )}
      >
        <Route path ='/' element={<HomePage/>}/>
      </Route>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path='/create-new-user' element={<CreateAccount/>}/>
      </Routes>
    </div>
  );
}

export default App;
