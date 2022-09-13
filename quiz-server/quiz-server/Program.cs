using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using quiz_server.data.Data;
using quiz_server.data.Data.Models;
using quiz_server.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var defaultConnection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<QuizDbContext>(options =>
options.UseSqlServer(defaultConnection));

builder.Services.AddAuthentication();

builder.Services.AddIdentityCore<ApplicationUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 3;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.User.RequireUniqueEmail = true;
});
new IdentityBuilder(typeof(ApplicationUser), typeof(IdentityRole), builder.Services)
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddSignInManager<SignInManager<ApplicationUser>>()
    .AddEntityFrameworkStores<QuizDbContext>();

var app = builder.Build();

await app.PrepareDatabase();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
