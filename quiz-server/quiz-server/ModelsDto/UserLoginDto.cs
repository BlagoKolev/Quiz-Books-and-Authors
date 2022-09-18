using System.ComponentModel.DataAnnotations;

namespace quiz_server.ModelsDto
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(6)]
        public string? Password { get; set; }
    }
}
