using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public interface IQuestionsService
    {
        GetQuestionDto GetNextQuestion();
    }
}
