using System.Text.Json.Serialization;

namespace TaskApp.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public  List<StdSubj>? StdSubjs { get; set; } = new List<StdSubj>();
    }
}
