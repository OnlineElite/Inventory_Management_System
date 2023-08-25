import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Dashboard from "./components/Dashbord";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from './components/LoginForm'
import UserInterface from './components/UserInterface'
import './App.css';
import { Routes, Route} from 'react-router-dom'

function App() {

  

  return (
    <div>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route path='/register' element={<RegisterForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path="/userInterface" element={<UserInterface/>} />
        </Routes>
    </div>
  );
}

export default App;
library.add(fab, fas, far)