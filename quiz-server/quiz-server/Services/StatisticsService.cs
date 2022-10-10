using quiz_server.data.Data;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly QuizDbContext db;

        public StatisticsService(QuizDbContext db)
        {
            this.db = db;
        }
        public IEnumerable<StatisticsUserScoreDto> GetTopUsers()
        {
            var users = this.db.Users
                .Select(x => new StatisticsUserScoreDto
                {
                    Username = x.UserName,
                    Score = x.Score,
                })
                .OrderByDescending(x => x.Score)
                .ToList()
                .Take(5);

            return users;
        }
    }
}
