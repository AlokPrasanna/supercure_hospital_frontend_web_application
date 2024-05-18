import './App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Login , Register , PatientHome , AdminHome , Home , DoctorHome , PendingUser , BlockUser} from './pages'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={2800} />
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/patient/:patientId' element={<PatientHome />}></Route>
            <Route path='/admin/:adminId' element={<AdminHome />}></Route>
            <Route path='/doctor/:doctorId' element={<DoctorHome />}></Route>
            <Route path='/new/user/:userId' element={<PendingUser />}></Route>
            <Route path='/blocked/:userId' element={<BlockUser />}></Route>
          </Routes>
      </BrowserRouter>
    </div>        
    </>
  )
}

export default App
