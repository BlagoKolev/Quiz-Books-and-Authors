using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_server.ModelsDto;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController
    {
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("addQuestion")]
        public IActionResult AddQuestion([FromBody] AddQuestionDto questionData)
        {
            var a = 6;
            return new OkResult();
        }

       
    }
}
