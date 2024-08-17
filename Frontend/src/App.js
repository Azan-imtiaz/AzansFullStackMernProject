
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./compoenents/Headers/header";
import Home from "./pages/Home/home";
import Edit from "./pages/Edit/edit";
import Profile from "./pages/Profile/profile";
import Register from "./pages/Register/register";
import { Route,Routes } from 'react-router-dom';
import Eror from './pages/Error/Eror';

function App() {
  return (
   <>
   <Header />
   <Routes>
    
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Register />} />
    <Route path='/edit/:id' element={<Edit />} />
    <Route path='/userprofile/:id' element={<Profile />} />
    <Route path='*' element={<Eror />}></Route>
   </Routes>

   </>
  );
}

export default App;
