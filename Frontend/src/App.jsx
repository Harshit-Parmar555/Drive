import Navbar1 from "./Navbar-1/Navbar1";
import Navbar2 from "./Navbar-2/Navbar2";
import Landing from "./Landing-Page/Landing";
import Register from "./Register/Register";
import Login from "./Login-Page/Login";
import Main from "./Main-Page/Main";
import Add from "./Add-Page/Add";
import Protected from "./Protected Route/Protected";
import {BrowserRouter , Route , Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar1/><Landing/></>}/>
        <Route path="/register" element={<><Navbar1/><Register/></>}/>
        <Route path="/login" element={<><Navbar1/><Login/></>}/>

        <Route element={<Protected/>}>
        <Route path="/main" element={<><Navbar2/><Main/></>}/>
        <Route path="/addfile" element={<><Navbar2/><Add/></>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
