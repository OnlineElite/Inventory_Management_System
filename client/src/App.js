import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Dashboard from "./components/Dashbord";
import LandingPage from "./components/LandingPage";
import './App.css';


function App() {

  

  return (
    <div>
      <LandingPage/>
    </div>
  );
}

export default App;
library.add(fab, fas, far)