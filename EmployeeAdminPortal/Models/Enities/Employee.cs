using System;

namespace EmployeeAdminPortal.Models.Enities;

public class Employee
{
    public Guid Id { get; set; }
    public required string Name { get; set; }

    public required string Email { get; set; }

    public  string? Phone { get; set; }

    public decimal Salary { get; set; }

    public required Guid DepartmentId { get; set; }
    public  Department Department { get; set; }


}
