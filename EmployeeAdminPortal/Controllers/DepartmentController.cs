using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models.Enities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
       public DepartmentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private readonly ApplicationDbContext dbContext;

        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            var allDepartments = dbContext.Departments.Include(x => x.Employees).ToList();
            return Ok(allDepartments);
        }
            [HttpPost]
        public IActionResult AddDepartment(AddDepartmentDto addDepartmentDto)
        {
            var departmentEntity = new Department()
            {
                DepartmentName = addDepartmentDto.DepartmentName,
                Employees = new List<Employee>()
            };          
            dbContext.Departments.Add(departmentEntity);
            dbContext.SaveChanges();
            return Ok(departmentEntity);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, UpdateDepartmentDto updateDepartmentDto)
        {
            var departmentEntity = dbContext.Departments.Include(x => x.Employees).FirstOrDefault(x => x.Id == id);
            if (departmentEntity == null)
            {
                return NotFound();
            }
            departmentEntity.DepartmentName = updateDepartmentDto.DepartmentName;
            dbContext.SaveChanges();
            return Ok(departmentEntity);
        }
    }

    public class AddDepartmentDto
    {
public string DepartmentName { get; set; } = string.Empty;    }
}
