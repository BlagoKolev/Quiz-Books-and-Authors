using quiz_server.data.Data.Models;

namespace quiz_server.ModelsDto
{
    public class GetQuestionDto
    {
        public GetQuestionDto()
        {
            this.Options = new HashSet<Author>();
        }
        public int Id { get; set; }
        public string Text { get; set; }
        public int AnswerId { get; set; }
        public string AnswerName { get; set; } //This is the right authors name(right answer).
        public byte PointsReward { get; set; }
        public virtual ICollection<Author> Options { get; set; }
    }
}
