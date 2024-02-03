import './App.css';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm';
import { Route, Routes} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path='/create-new-user' element={<CreateAccount/>}/>
      </Routes>
    </div>
  );
}

export default App;
