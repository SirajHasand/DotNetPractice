import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, getDepartment, updateDepartment } from "../api/api";

function DepartmentForm() {
    const {id } = (useParams());
    const navigate = useNavigate(); // Get id from URL parameters
      const [formData, setFormData] = useState({
        departmentName: ''
    });

    const isediting = !!id; 
    useEffect(() => {
        if (isediting) {
            loadDepartment(); // Load department data if editing
        }   
    }, [id]);
    const loadDepartment = async () => { // Load department data if editing
        try {
          const response = await getDepartment(id);   
            const department = response.data;
            setFormData({
                departmentName: department.departmentName
            });
        } catch (err) {
          console.error('Error loading department:', err);
        }
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {            // Here you would typically send formData to your backend API to create a new department
            const data = {
                departmentName : formData.departmentName
            }
            if (isediting) {
                await updateDepartment(id,data);
            } else {

            await createDepartment(data);
            }
            navigate('/departments'); // Navigate back to the departments list after submission
        } catch (err) {
            console.error('Error submitting department data:', err);
        }
    };

  return (
    <div className='min-h-full bg-gray-50'>
        <div className='min-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div>
            <h1 className='text-2xl font-bold text-gray-800 p-6'>
                {isediting ? 'Edit Department' : 'Add New Department'}
            </h1>
            <p className='text-sm text-gray-500 mt-1 px-6'>
                {isediting ? 'Edit the department details below' : 'Fill in the details below to add a new department'}
            </p>
        </div>
        <div>
            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
                <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department Name
                    </label>
                    <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="departmentName"
                        type="text"
                        placeholder="Enter department name"
                        value={formData.departmentName}
                        onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                    />
                </div>
                <div className=''>
                    <button 
                    type="submit"
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        {isediting ? 'Update Department' : 'Create Department'}
                    </button>
                    <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'
                        onClick={() => window.location.href = '/departments'}
                    >
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default DepartmentForm