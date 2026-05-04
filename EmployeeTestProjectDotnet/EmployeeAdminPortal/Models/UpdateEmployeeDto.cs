using System;

namespace EmployeeAdminPortal.Models;

public class UpdateEmployeeDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required decimal Salary { get; set; }
    public required Guid DepartmentId { get; set; }

}
