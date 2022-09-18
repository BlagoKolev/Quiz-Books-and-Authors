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
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountsService(QuizDbContext db,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            this.db = db;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<SignInResult> AutoLogin(UserLoginDto userToLogin)
        {
            //var user = db.Users
            //      .Where(u => u.Email == email)
            //      .FirstOrDefault();

            //var canSignIn = await signInManager.CanSignInAsync(user);
            //var result = new SignInResult();

            var result = await signInManager.PasswordSignInAsync(userToLogin.Email, userToLogin.Password, false, false);

            return result;
        }

        public async Task<ApplicationUser> GetUserByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }

        public async Task<bool> isUserExist(string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
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
