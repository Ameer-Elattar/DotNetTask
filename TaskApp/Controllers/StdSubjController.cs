using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskApp.Models;


namespace TaskApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StdSubjController : ControllerBase
    {
        TaskContext context;
        public StdSubjController(TaskContext _context)
        {
            context = _context;
        }

        [HttpPost("assign-subject")]
        public IActionResult AssignSubjectToStudent( StdSubj stdSubj)
        {
            var student = context.students.FirstOrDefault(s => s.Id == stdSubj.stdId);
            var subject = context.subjects.FirstOrDefault(s => s.Id == stdSubj.subjId);

            if (student == null || subject == null)
                return NotFound("Student or Subject not found");

            var existingRecord = context.StdSubjs
           .FirstOrDefault(ss => ss.stdId == stdSubj.stdId && ss.subjId == stdSubj.subjId);

            if (existingRecord != null)
                return Conflict("This student is already assigned to the specified subject.");
            context.StdSubjs.Add(new StdSubj
            {
                stdId = stdSubj.stdId,
                subjId = stdSubj.subjId
            });

            context.SaveChanges();

            return Ok("Subject assigned to Student successfully");
        }

        [HttpDelete("{stdID:int}/remove-subject/{subjID:int}")]
        public IActionResult RemoveSubjectFromStudent( int studentId,  int subjectId)
        {
           
                
                var stdSubjRecord = context.StdSubjs
                    .FirstOrDefault(ss => ss.stdId == studentId && ss.subjId == subjectId);

                if (stdSubjRecord == null)
                    return NotFound("The relationship between the student and subject does not exist.");

                
                context.StdSubjs.Remove(stdSubjRecord);
                context.SaveChanges();

                return Ok("Subject removed from student successfully.");
            }
            
        }


    }


