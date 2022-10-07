using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public interface IAdminsService
    {
        bool CheckBookExist(string bookTitle);
        CheckAuthorExistDto CheckAuthorExist(string authorName);
        Task<int> AddQuestion(string bookName,string authorName, CheckAuthorExistDto author);
    }
}
