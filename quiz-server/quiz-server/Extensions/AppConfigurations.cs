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
