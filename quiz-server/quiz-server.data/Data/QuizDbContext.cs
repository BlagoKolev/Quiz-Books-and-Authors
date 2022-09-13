using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using quiz_server.data.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz_server.data.Data
{
    public class QuizDbContext : IdentityDbContext<ApplicationUser>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }

        public DbSet<ApplicationUser>? Users { get; set; }
        public DbSet<Question>? Questions { get; set; }
        public DbSet<Author>? Authors { get; set; }
    }
}