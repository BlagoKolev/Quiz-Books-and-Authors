using Microsoft.AspNetCore.Mvc;
using quiz_server.ModelsDto;
using quiz_server.Services;

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
    }
}
