import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthChecker from './components/AuthChecker';
import FormBuilder from './pages/FormBuilder';
import FormsPage from './pages/Forms';
import FillOutForm from './components/FillOutForm';


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
        <Route path ='/home' element={<HomePage/>}/>
        <Route path ='/formbuilder' element={<FormBuilder/>}/>
        <Route path ='/forms' element={<FormsPage/>}/>
        {/* <Route path = '/Actions' element={<Actions/>}/> */}
      </Route>
        <Route path="/" element={<LoginForm/>}/>
        <Route path='/create-new-user' element={<CreateAccount/>}/>
      </Routes>
    </div>
  );
}

export default App;
