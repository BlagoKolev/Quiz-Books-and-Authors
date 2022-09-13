using Microsoft.EntityFrameworkCore;
using quiz_server.data.Data;

namespace quiz_server.Extensions
{
    public static class AppConfigurations 
    {
        public static async Task<IApplicationBuilder> PrepareDatabase( this IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();
            var services = serviceScope.ServiceProvider;

            MigrateDatabase(services);

            return app;
        }

        private static QuizDbContext GetDbContext(IServiceProvider services)
        {
            return services.GetRequiredService<QuizDbContext>();
        }
        private static void MigrateDatabase( IServiceProvider services)
        {
            var db = GetDbContext(services);
            db.Database.Migrate();
        }
    }
}
