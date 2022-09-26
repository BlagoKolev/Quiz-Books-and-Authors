using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_server.ModelsDto;
using quiz_server.Services;
using System.Security.Claims;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionsService questionsService;

        public QuestionsController(IQuestionsService questionsService)
        {
            this.questionsService = questionsService;
        }
       
        [HttpGet]
        public IActionResult Get()
        {
            var question = questionsService.GetNextQuestion();
            if (question != null)
            {
                return Ok(question);
            }
            return BadRequest(question);
        }

        [HttpPost]
        [Route("setScore")]
        [Authorize]
        public IActionResult SetScore()
        {
            var user = this.User;
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;
            var userId = User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value;
            var userEmail =this.User.FindFirstValue(ClaimTypes.Email);
            return Ok("Access granted");
        }
    }
}
