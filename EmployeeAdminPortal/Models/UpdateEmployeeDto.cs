using System;

namespace EmployeeAdminPortal.Models;

public class UpdateEmployeeDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required int Salary { get; set; }

}
