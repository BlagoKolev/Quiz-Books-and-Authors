using Microsoft.AspNetCore.Identity;
using quiz_server.data.Data.Models;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public interface IAccountsService
    {
        Task<IdentityResult> Register(UserRegisterDto userToRegister);
        //void AutoLogin(UserLoginDto userToLogin);
        Task<bool> isUserExist(string email);
        Task<ApplicationUser> GetUserByEmail(string email);
        Task<bool> CheckPassword(ApplicationUser currentUser, string password);
    }
}
