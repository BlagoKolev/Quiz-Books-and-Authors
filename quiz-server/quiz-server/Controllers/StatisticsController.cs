using Microsoft.AspNetCore.Mvc;
using quiz_server.Services;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            this.statisticsService = statisticsService;
        }

        [HttpGet]
        [Route("scores")]
        public IActionResult Scores()
        {
            var users = this.statisticsService.GetTopUsers();
            return Ok(users);
        }
    }
}
