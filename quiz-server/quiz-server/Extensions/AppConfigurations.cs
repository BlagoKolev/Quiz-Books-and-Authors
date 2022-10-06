using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using quiz_server.data.Data;
using quiz_server.data.Data.Models;
using System.Text.Json;

namespace quiz_server.Extensions
{
    public static class AppConfigurations
    {
        public static async Task<IApplicationBuilder> PrepareDatabase(this IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();
            var services = serviceScope.ServiceProvider;

            MigrateDatabase(services);
            SeedAuthors(services);
            SeedQuestions(services);
            await CreateAdministrator(services);
            return app;
        }

        private static async Task<IdentityResult> CreateAdministrator(IServiceProvider services)
        {
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var result = new IdentityResult();

            if (await roleManager.RoleExistsAsync("Administrator"))
            {
                return result;
            }

            var adminRole = new IdentityRole("Administrator");
            await roleManager.CreateAsync(adminRole);

            var admin = new ApplicationUser
            {
                Email = "admin@quiz.com",
                UserName = "admin@quiz.com",
                Role = "Administrator",
            };

            await userManager.CreateAsync(admin, "123456");
            result = await userManager.AddToRoleAsync(admin, adminRole.Name);
        
            return result;
        }
        private static void SeedQuestions(IServiceProvider services)
        {
            var db = GetDbContext(services);
            if (db.Questions.Any())
            {
                return;
            }

            using FileStream openStream = File.OpenRead("Resources/Questions.json");
            var questions = JsonSerializer.DeserializeAsync<Question[]>(openStream).GetAwaiter().GetResult();

            db.Questions.AddRangeAsync(questions).GetAwaiter().GetResult();
            db.SaveChangesAsync().GetAwaiter().GetResult();
        }
        private static void SeedAuthors(IServiceProvider services)
        {
            var db = GetDbContext(services);

            if (db.Authors.Any())
            {
                return;
            }
            //string directory = Directory.GetCurrentDirectory();
            using FileStream openStream = File.OpenRead("Resources/Authors.json");
            var authors = JsonSerializer.DeserializeAsync<Author[]>(openStream).GetAwaiter().GetResult();

            db.Authors.AddRangeAsync(authors).GetAwaiter().GetResult();
            db.SaveChangesAsync().GetAwaiter().GetResult();
        }
        private static QuizDbContext GetDbContext(IServiceProvider services)
        {
            return services.GetRequiredService<QuizDbContext>();
        }
        private static void MigrateDatabase(IServiceProvider services)
        {
            var db = GetDbContext(services);
            db.Database.Migrate();
        }

    }
}
