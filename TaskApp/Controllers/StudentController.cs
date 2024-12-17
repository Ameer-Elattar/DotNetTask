using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskApp.Models;
using Microsoft.EntityFrameworkCore;
namespace TaskApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        TaskContext context;
        public StudentController(TaskContext _context)
        {
            context = _context;
        }
        [HttpGet]
        public IActionResult getAllStudent()
        {
            var students = context.students
                .Select(s => new { 
                    id = s.Id, 
                    name = s.Name, 
                    address = s.Address,
                    subjects = s.StdSubjs.Select(s => new {id=s.subjId,name=s.Subject.Name})});

            return Ok(students);
        }
        [HttpGet("{id:int}")]
        public IActionResult getById(int id)
        {
            var student = context.students.Where(s=>s.Id == id)
                .Select(std => new { 
                    name = std.Name, 
                    address = std.Address,
                    subjects = std.StdSubjs.Select(sub => new {id=sub.subjId,name=sub.Subject.Name}) });
            if (student == null) return NotFound("Student Doesn't exist");

            return Ok(student);
        }
        [HttpPost]
        public IActionResult addStudent(Student std)
        {
            context.students.Add(std);
            context.SaveChanges();
            return CreatedAtAction("getById",new{id=std.Id},std);
        }
        [HttpPut("{id:int}")]
        public IActionResult updateStudet(int id,Student stdFromRequest) {
            var stdFromDB = context.students.FirstOrDefault(s => s.Id == id);
            if (stdFromDB==null) return NotFound("Student Doesn't exist");
            stdFromDB.Name = stdFromRequest.Name;
            stdFromDB.Address = stdFromRequest.Address;
            context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public IActionResult deleteStudent(int id)
        {
            var student = context.students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound("Student Doesn't exist");
            context.students.Remove(student);
            context.SaveChanges();
            return NoContent();
        }
    }
}
