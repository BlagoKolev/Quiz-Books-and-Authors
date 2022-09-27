using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public interface IQuestionsService
    {
        GetQuestionDto GetNextQuestion();
        Task<int> UpdateUserScore(string userId, int pointsReward);
    }
}
