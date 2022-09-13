using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz_server.data.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        //public int Id { get; set; }
        //public string Username { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }
        //public string PasswordHash { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public int Score { get; set; }
    }
}
