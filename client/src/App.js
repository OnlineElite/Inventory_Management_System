import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import './App.css';
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <Sidebar/>
      </div>
      <div className="col">

      </div>
    </div>
  );
}

export default App;
library.add(fab, fas, far)