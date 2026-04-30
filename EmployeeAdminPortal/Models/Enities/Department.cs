using System;

namespace EmployeeAdminPortal.Models.Enities;

public class Department
{
    public Guid Id { get; set; }
    public required string DepartmentName { get; set; }

    public required List<Employee> Employees { get; set; }


}
