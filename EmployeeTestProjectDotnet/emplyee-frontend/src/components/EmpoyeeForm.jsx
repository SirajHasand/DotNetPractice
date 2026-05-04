import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployee, getAllDepartments } from '../api/api';
// The logic of this component is to add or edit employee
// It uses React hooks such as useState and useEffect to manage the component's state and side effects
// It also uses the useParams hook to get the id parameter from the URL, which is used to determine whether to add a new employee or edit an existing one
// If id exists then edit, if id does not exist then add new employee
// If id exists then edit employee, if id does not exist then add new employee
// use this form for add new employee or edit existing employee, depending on the id parameter in the URL
function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    departmentId: ''
  });
  const [loading, setLoading] = useState(false);

  const isEditing = !!id; // Check if id is truthy, get employee to edit, from API, is Editing mean updating, if id exists then edit
  // !! mean convert to boolean, !!id is get id from url, if id exists then edit, if id does not exist then add new employee

  useEffect(() => {
    loadDepartments(); // Load departments when the component mounts
    if (isEditing) {
      loadEmployee(); // Load employee data if editing
    }
  }, [id]);

  const loadDepartments = async () => { // Load departments when the component mounts
    try {
      const response = await getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      console.error('Error loading departments:', err);
    }
  };

  const loadEmployee = async () => { // Load employee data if editing   
    try {
      const response = await getEmployee(id);
      const employee = response.data;
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone || '',
        salary: employee.salary,
        departmentId: employee.departmentId
      });
    } catch (err) {
      console.error('Error loading employee:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    try {
      const data = { // Create employee data object from form values
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        salary: parseFloat(formData.salary),
        departmentId: formData.departmentId
      };
      if (isEditing) { // If editing, update employee with id using updated data
        await updateEmployee(id, data);
      } else { // If not editing, create new employee using data
        await createEmployee(data);
      }
      navigate('/'); // Navigate to employee list page after saving
    } catch (err) {
      console.error('Error saving employee:', err); // Log error if saving employee fails
    } finally {
      setLoading(false); // Set loading to false after saving or updating employee
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Update employee information' : 'Fill in the details to add a new employee'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name} // value mean the value of the input field, come from formData.name
              onChange={handleChange} // Handle name input change
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}//
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Employee' : 'Add Employee')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;