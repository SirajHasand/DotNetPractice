using System;

namespace EmployeeAdminPortal.Models;

public class AddEmployeeDto
{
    public required string Name { get; set; }

    public required string Email { get; set; }

    public  string? Phone { get; set; }

    public decimal Salary { get; set; }

    public required Guid DepartmentId { get; set; }

}
