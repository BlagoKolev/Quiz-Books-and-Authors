using Microsoft.AspNetCore.Identity;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public interface IAccountsService
    {
        Task<IdentityResult> Register(UserRegisterDto userToRegister);
    }
}
