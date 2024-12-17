using Microsoft.EntityFrameworkCore;

namespace TaskApp.Models
{
    public class TaskContext:DbContext
    {
        public virtual DbSet<Student> students { get; set; }
        public virtual DbSet<Subject> subjects { get; set; }
        public virtual DbSet<StdSubj> StdSubjs{ get; set; }


        public TaskContext(DbContextOptions<TaskContext> options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StdSubj>().HasKey("stdId", "subjId");
        }
    }
}
