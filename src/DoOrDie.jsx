// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './Components/login';
import {Home} from "./Components/Home";
import {Navigation} from './Components/Navigation';
// import {Logout} from './Components/Logout';
import Logout from './Components/Logout';
// import {Logout} from './component/logout';
const App = () => {    
    return (
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    );
};
export default App;