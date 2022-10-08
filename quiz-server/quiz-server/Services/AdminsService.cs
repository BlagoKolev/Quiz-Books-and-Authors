using quiz_server.data.Data;
using quiz_server.data.Data.Models;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public class AdminsService : IAdminsService
    {
        private readonly QuizDbContext db;

        public AdminsService(QuizDbContext db)
        {
            this.db = db;
        }

        public async Task<int> AddQuestion(string bookTitle, string authorName,byte pointsReward, CheckAuthorExistDto author)
        {
            var result = 0;
            var question = $"The author of '{bookTitle}' is:";
            var correctAnswer = "";

            if (author == null)
            {
                var newAuthor = new Author()
                {
                    Name = authorName
                };
                await this.db.Authors.AddAsync(newAuthor);
                await this.db.SaveChangesAsync();

                var newQuestion = new Question()
                {
                    Text = question,
                    AnswerId = newAuthor.Id,
                    AnswerName = newAuthor.Name,
                    PointsReward = pointsReward,
                };
                await this.db.Questions.AddAsync(newQuestion);
                result = await this.db.SaveChangesAsync();
            }
            else
            {
                var newQuestion = new Question()
                {
                    Text = question,
                    AnswerId = author.Id,
                    AnswerName = author.Name,
                    PointsReward = pointsReward,
                };
                await this.db.Questions.AddAsync(newQuestion);
                result = await this.db.SaveChangesAsync();
            }

            return result;
        }

        public bool CheckBookExist(string bookTitle)
        {
            var currentQuestion = $"The author of '{bookTitle}' is:";
            var question = this.db.Questions
                .Where(x => x.Text == currentQuestion)
                .FirstOrDefault();
            return question == null ? false : true;
        }

        public CheckAuthorExistDto CheckAuthorExist(string authorName)
        {
            var author = this.db.Authors
                 .Where(x => x.Name.ToLower() == authorName.ToLower())
                 .Select(x => new CheckAuthorExistDto
                 {
                     Id = x.Id,
                     Name = x.Name,
                 })
                 .FirstOrDefault();
            return author;
        }

    }
}
