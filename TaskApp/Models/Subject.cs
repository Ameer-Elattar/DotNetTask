using System.Text.Json.Serialization;

namespace TaskApp.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public  List<StdSubj>? StdSubjs { get; set; } = new List<StdSubj>();

    }
}
