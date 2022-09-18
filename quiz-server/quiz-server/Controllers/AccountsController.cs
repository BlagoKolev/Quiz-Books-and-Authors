using System.Text.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using quiz_server.Configuration;
using quiz_server.ModelsDto;
using quiz_server.Services;
using quiz_server.data.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly JwtConfig jwtConfig;

        public AccountsController(IAccountsService accountsService, IOptionsMonitor<JwtConfig> optionMonitor)
        {
            this.accountsService = accountsService;
            this.jwtConfig = optionMonitor.CurrentValue;
        }

        [Authorize]
        [HttpGet]
        public string Get()
        {
            return "Get method";
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userToRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new RegistrationResponse() { Errors = new List<string> { "Invalid payload." } });
            }

            var isUserExist = await this.accountsService.isUserExist(userToRegister.Email);

            if (isUserExist)
            {
                return BadRequest(new RegistrationResponse()
                {
                    Errors = new List<string>() { "Email already exists." },
                });
            }

            var result = await this.accountsService.Register(userToRegister);

            if (result.Succeeded)
            {
                var user = await accountsService.GetUserByEmail(userToRegister.Email);
                var newJwtToken = CreateJWT(user);

                return Ok(new RegistrationResponse()
                {
                    Success = true,
                    Token = newJwtToken
                });
            }
            return BadRequest(new RegistrationResponse()
            {
                Success = false,
                Errors = result.Errors.Select(x => x.Description).ToList()
            });

        }
       
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userToLogin)
        {
            var result = await accountsService.AutoLogin(userToLogin);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }

        private string CreateJWT(ApplicationUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtConfig.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key)
                , SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
