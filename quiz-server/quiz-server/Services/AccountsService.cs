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

        //public async Task<SignInResult> AutoLogin(string email, string password)
        //{
        //    var user = db.Users
        //          .Where(u => u.Email == email)
        //          .FirstOrDefault();

        //    var canSignIn = await signInManager.CanSignInAsync(user);
        //    var result = new SignInResult();
        //    if (canSignIn)
        //    {
        //         result = await signInManager.PasswordSignInAsync(email, password, false, false);
        //    }
            
        //    return result;
        //}

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
