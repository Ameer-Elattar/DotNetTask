using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApp.Models;

namespace TaskApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        TaskContext context;
        public SubjectController(TaskContext _context)
        {
            context = _context;
        }
        [HttpGet]
        public IActionResult getAllSubject()
        {
            var subjects = context.subjects
                .Select(sub => new { 
                    id = sub.Id, 
                    name = sub.Name, 
                    students = sub.StdSubjs.Select(std => new {id=std.stdId,name=std.Student.Name}) });

            return Ok(subjects);
        }
        [HttpGet("{id:int}")]
        public IActionResult getById(int id)
        {
            var subject = context.subjects
                .Where(sub=>sub.Id == id)
                .Select(sub => new {
                    id = sub.Id,
                    name = sub.Name,
                    students = sub.StdSubjs.Select(std => new { id = std.stdId, name = std.Student.Name })
                });
            if (subject == null) return NotFound("Subject Doesn't exist");

            return Ok(subject);
        }
        [HttpPost]
        public IActionResult addSubject(Subject subj)
        {
            context.subjects.Add(subj);
            context.SaveChanges();
            return CreatedAtAction("getById", new { id = subj.Id }, subj);
        }
        [HttpPut("{id:int}")]
        public IActionResult updateStudet(int id, Subject subjFromRequest)
        {
            var subjFromDB = context.subjects.FirstOrDefault(s => s.Id == id);
            if (subjFromDB == null) return NotFound("Subject Doesn't exist");
            subjFromDB.Name = subjFromRequest.Name;
            context.SaveChanges();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public IActionResult deleteSubject(int id)
        {
            var subject = context.subjects.FirstOrDefault(s => s.Id == id);
            if (subject == null) return NotFound("Subject Doesn't exist");
            context.subjects.Remove(subject);
            context.SaveChanges();
            return NoContent();
        }
    }
}
