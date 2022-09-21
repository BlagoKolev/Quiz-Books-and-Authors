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

            return app;
        }
        private static async void SeedQuestions(IServiceProvider services)
        {
            var db = GetDbContext(services);
            if (db.Questions.Any())
            {
                return;
            }

            using FileStream openStream = File.OpenRead("Resources/Questions.json");
            var questions = await JsonSerializer.DeserializeAsync<Question[]>(openStream);

            await db.Questions.AddRangeAsync(questions);
            await db.SaveChangesAsync();
        }
        private static async void SeedAuthors(IServiceProvider services)
        {
            var db = GetDbContext(services);

            if (db.Authors.Any())
            {
                return;
            }
            //string directory = Directory.GetCurrentDirectory();
            using FileStream openStream = File.OpenRead("Resources/Authors.json");
            var authors = await JsonSerializer.DeserializeAsync<Author[]>(openStream);

            await db.Authors.AddRangeAsync(authors);
            await db.SaveChangesAsync();
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
