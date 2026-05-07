import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../api/api';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    useEffect(()=>{
        loadDepartments();
    },[])
    useEffect (()=>{
        const filtered = departments.filter(dept => dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredDepartments(filtered);
        console.log(filtered);
    }, [searchTerm, departments]);

    const loadDepartments = async () =>{
        try {
        const response = await getAllDepartments();
        setDepartments(response.data);
        setFilteredDepartments(response.data);
        console.log(response.data);
        } catch (err) {
            console.error("Error loading departments:", err);
            setDepartments([]);
        }

    }
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await deleteDepartment(id);
                loadDepartments();
            } catch (err) {
                console.error("Error deleting department:", err);
            }
        }
    };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        {/* card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            
        {/* header */}
        <div className="p-6 border-b flex justify-between bg-gradient-to-r from-gray-50 to-gray-100">
            <div>
            <h1 className='text-2xl font-bold text-gray-800 p-6'>Department Management</h1>
            <p className='text-sm text-gray-500 mt-1 px-6'>List of all registered departments</p>
            </div>
            <div>
                <button className='font-bold bg-blue-400 text-white p-3 rounded-lg mr-3'
                onClick={()=> window.location.href=(`/add-department`)}
                >
                    Add New Department
                </button>
                <button className='font-bold bg-green-500 text-white p-3 rounded-lg'
                onClick={() => window.location.href=(`/`)}
                >
                    Manage Employees

                </button>
            </div>

        </div>
            {/* search */}
        <div className='p-4 border-b'>
            <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full  border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        {/* department list */}
        <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left '>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-6 py-4 text-center'>#</th>
                        <th className='px-6 py-4'>Department Name</th>
                        <th className='px-6 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.length === 0 ? (
                        <tr>
                            <td colSpan="3" className='text-center py-4 text-gray-500'>
                                No departments found.
                            </td>
                        </tr>
                    ) : (
                        filteredDepartments.map((dept, index) => (
                            <tr key={dept.id} className='border-t'>
                                <td className='px-6 py-4 text-center'>{index + 1}</td>
                                <td className='px-6 py-4'>{dept.departmentName}</td>
                                <td className='px-6 py-4'>
                                    <button className='text-blue-500 hover:text-blue-700 mr-3'
                                    onClick={()=> window.location.href= (`/edit-department/${dept.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                     className='text-red-500 hover:text-red-700'
                                      onClick={() => { handleDelete(dept.id) }}
                                    >
                                    
                                     Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        </div>



    </div>
  );
}

export default Departments