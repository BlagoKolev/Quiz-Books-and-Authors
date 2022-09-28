using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_server.ModelsDto;
using quiz_server.Services;
using System.Security.Claims;
using System.Text.Json;

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
        [Authorize]
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
        public async Task<IActionResult> SetScore([FromBody] SetUserScoreDto request)
        {
            //var userEmail = this.User.FindFirstValue(ClaimTypes.Email);
            //var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;
            var userId = User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value;
            var userTotalScore = await questionsService.UpdateUserScore(userId, request.PointsReward);
            return Ok(JsonSerializer.Serialize(userTotalScore));
        }
    }
}
