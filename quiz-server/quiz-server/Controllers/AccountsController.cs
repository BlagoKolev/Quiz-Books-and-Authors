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
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly IConfiguration configuration;
        private readonly JwtConfig jwtConfig;

        public AccountsController(IAccountsService accountsService,
            IOptionsMonitor<JwtConfig> optionMonitor, IConfiguration configuration)
        {
            this.accountsService = accountsService;
            this.configuration = configuration;
            this.jwtConfig = optionMonitor.CurrentValue;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[HttpGet]
        //public IActionResult Get()
        //{
        //    return Ok(new { response = "Success", status = "Ok" });
        //}

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
                    Token = newJwtToken,
                    Username = user.UserName,
                    Score = user.Score,
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
            if (!this.ModelState.IsValid)
            {
                return BadRequest(new LoginResponse()
                {
                    Errors = new List<string> { "Invalid payload." }
                });
            }

            var user = await this.accountsService.GetUserByEmail(userToLogin.Email);

            if (user != null)
            {
                var isPasswordMatch = await accountsService.CheckPassword(user, userToLogin.Password);
                if (isPasswordMatch)
                {
                    var newJwtToken = CreateJWT(user);

                    return Ok(new LoginResponse()
                    {
                        Success = true,
                        Token = newJwtToken,
                        Username = user.UserName,
                        Score = user.Score,
                    });
                }
            }

            return BadRequest(new LoginResponse()
            {
                Success = false,
                Errors = new List<string>() { "Invalid login." }
            });

        }

        private string CreateJWT(ApplicationUser user)
        {
            //var jwtTokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(this.jwtConfig.Key);
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new[]
            //    {
            //        new Claim("id", user.Id),
            //        new Claim(JwtRegisteredClaimNames.Email, user.Email),
            //        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //                        }),
            //    Expires = DateTime.UtcNow.AddHours(12),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key)
            //    , SecurityAlgorithms.HmacSha256Signature)
            //};

            //var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            //var jwtToken = jwtTokenHandler.WriteToken(token);

            //return jwtToken;

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.jwtConfig.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenClaims = new[]
            {
                new Claim("id", user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier,  user.UserName),
                //new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
               this.jwtConfig.Issuer,
               this.jwtConfig.Audience,
               tokenClaims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
