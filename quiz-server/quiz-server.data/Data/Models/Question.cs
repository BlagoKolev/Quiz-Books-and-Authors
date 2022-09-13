using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz_server.data.Data.Models
{
    public class Question
    {
        public Question()
        {
            this.Options = new HashSet<Author>();
        }
        public int Id { get; set; }
        public string Text { get; set; }
        public virtual Author Answer { get; set; }
        public int AnswerId { get; set; }
        public string AnswerName { get; set; } //This is the right authors name(right answer).
        public byte PointsReward { get; set; }
        public virtual ICollection<Author> Options { get; set; }
    }
}
