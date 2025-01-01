using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TaskApp.Models
{
    public class StdSubj
    {
        [ForeignKey("Student")]
        public int stdId { get; set; }
        [ForeignKey("Subject")]
        public int subjId { get; set; }
        //[JsonIgnore]

        public Student? Student { get; set; }
        //[JsonIgnore]

        public Subject? Subject { get; set; }


    }
}
