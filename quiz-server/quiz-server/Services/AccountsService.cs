using Microsoft.AspNetCore.Identity;
using quiz_server.data.Data;
using quiz_server.data.Data.Models;
using quiz_server.ModelsDto;

namespace quiz_server.Services
{
    public class AccountsService : IAccountsService
    {
        private readonly QuizDbContext db;
        private readonly UserManager<ApplicationUser> userManager;

        public AccountsService(QuizDbContext db,
            UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }
        public async Task<IdentityResult> Register(UserRegisterDto userToRegister)
        {
            var newUser = new ApplicationUser
            {
                Email = userToRegister.Email,
                UserName = userToRegister.Email,
                PasswordHash = userToRegister.Password,
            };

            IdentityResult result = await userManager.CreateAsync(newUser, userToRegister.Password);
            return result;
        }
    }
}
