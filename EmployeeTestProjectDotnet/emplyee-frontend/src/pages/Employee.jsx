import { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../api/api";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
    loadEmployees();
  }, []);
    const loadEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
      setFilteredEmployees(response.data); // this is to set the filtered employees to the same as the employees, so that when the search term is empty, it will show all the employees
    } catch (err) {
      console.error("Error loading employees:", err);
      setEmployees([]);
      setFilteredEmployees([]);
    }
  };

  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleDelete = async (id)=>{
    if(window.confirm('Delete this employee ? ')){
      await deleteEmployee(id);
      loadEmployees();
    }
  }

  const handleEdit = (id) => {
    window.location.href = `/edit-employee/${id}`;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between bg-gradient-to-r from-gray-50 to-gray-100">
          <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            List of all registered employees
          </p>
        </div>
        <div>
          <button className="font-bold bg-blue-400 text-white p-3 rounded-lg mr-3"
          onClick={() => window.location.href=(`/add-employee`)}
          >Add New Employee</button>
          <button className="font-bold bg-green-500 text-white p-3 rounded-lg"
          onClick={() => window.location.href=(`/Departments`)}
          >Manage Departments
          </button>
        </div>
        
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            {/* Head */}
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-center">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Actions</th>
                
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              { filteredEmployees.length === 0 ?
               (
                   <p className="text-gray-500 w-full  flex justify-center p-4">No employee yet.</p>
              ):(
              filteredEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-center font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {employee.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {employee.email}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {employee.phone}
                  </td>

                  <td className="px-6 py-4 font-medium text-green-600">
                    ${employee.salary.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                      {employee.department?.departmentName || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-green-600">
                    <button
                  onClick={()=> handleDelete(employee.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm mr-3"
                >
                  
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Employee;