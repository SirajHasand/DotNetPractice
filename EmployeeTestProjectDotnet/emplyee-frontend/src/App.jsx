import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Employee from './pages/Employee'
import EmployeeForm from './components/EmpoyeeForm';
import Departments from './pages/Departments';
import DepartmentForm from './components/DepartmentForm';
import Auth from './pages/Auth';

function App() {

  return (
    <>  
    <div className="w-full min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/employees' element={<Employee/>}/>
          <Route path='/add-employee' element={<EmployeeForm/>}/>
          <Route path='/edit-employee/:id' element={<EmployeeForm/>}/>
          <Route path='/Departments' element={<Departments/>}/>
          <Route path='/add-department' element={<DepartmentForm/>}/>
          <Route path='/edit-department/:id' element={<DepartmentForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    

    </>
  )
}

export default App
