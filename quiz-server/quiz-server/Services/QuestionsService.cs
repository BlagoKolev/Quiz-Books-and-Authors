using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using quiz_server.data.Data;
using quiz_server.data.Data.Models;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public class QuestionsService : IQuestionsService
    {
        private readonly QuizDbContext db;

        public QuestionsService(QuizDbContext db)
        {
            this.db = db;
        }
        public GetQuestionDto GetNextQuestion()
        {
            var randomId = new Random();
            var maxQuestionNumber = db.Questions.Count();
            var randomQuestionId = randomId.Next(1, maxQuestionNumber);
            var listWithOptions = new List<int>();

            var newQuestion = db.Questions
                .Where(x => x.Id == randomQuestionId)
                .Select(x => new GetQuestionDto
                {
                    Id = x.Id,
                    Text = x.Text,
                    AnswerId = x.AnswerId,
                    AnswerName = x.AnswerName,
                    PointsReward = x.PointsReward,

                })
                .FirstOrDefault();

            if (newQuestion != null)
            {
                listWithOptions.Add(newQuestion.AnswerId);
                var maxAuthorsNumber = db.Authors.Count();

                while (listWithOptions.Count < 4)
                {
                    var nextOptionId = randomId.Next(1, maxAuthorsNumber);
                    if (!listWithOptions.Contains(nextOptionId))
                    {
                        listWithOptions.Add(nextOptionId);
                    }
                }

                var shuffledListWithOptions = ShuffleOptions(listWithOptions);
                // ID = 46 warning
                foreach (var option in shuffledListWithOptions)
                {
                    newQuestion.Options.Add(
                        db.Authors
                        .Where(x => x.Id == option)
                        .FirstOrDefault()
                        );
                }
            }

            return newQuestion;
        }

        public async Task<int> UpdateUserScore(string userId, int pointsReward)
        {
            var user = db.Users
                .Where(x => x.Id == userId)
                .FirstOrDefault();

            if (user != null)
            {
                user.Score += pointsReward;
                await db.SaveChangesAsync();
                return user.Score;
            }
            return 0;
        }

        private static List<int> ShuffleOptions(List<int> randomList)
        {
            var random = new Random();
            var randomIndex = random.Next(0, 3);
            var temp = randomList[0];
            randomList[0] = randomList[randomIndex];
            randomList[randomIndex] = temp;
            return randomList;
        }


    }
}
