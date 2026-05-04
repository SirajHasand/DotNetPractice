import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Employee from './pages/Employee'
import EmployeeForm from './components/EmpoyeeForm';

function App() {

  return (
    <>  
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employee/>}/>
          <Route path='/add-employee' element={<EmployeeForm/>}/>
          <Route path='/edit-employee/:id' element={<EmployeeForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    

    </>
  )
}

export default App
