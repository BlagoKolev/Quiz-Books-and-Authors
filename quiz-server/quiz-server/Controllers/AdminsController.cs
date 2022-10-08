using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quiz_server.ModelsDto;
using quiz_server.Services;

namespace quiz_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminsService adminsService;

        public AdminsController(IAdminsService adminsService)
        {
            this.adminsService = adminsService;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("addQuestion")]
        public async Task<IActionResult> CreateQuestion([FromBody] AddQuestionDto questionData)
        {
            var bookExists = this.adminsService.CheckBookExist(questionData.BookTitle);
            if (bookExists)
            {
                return BadRequest(new AddNewQuestionResponseDto
                {
                    Message = "Book already exist",
                    Status = "Failed"
                });
            }
            var author = adminsService.CheckAuthorExist(questionData.AuthorName);
            var result = await adminsService.AddQuestion(questionData.BookTitle, questionData.AuthorName, questionData.PointsReward, author);

            if (result > 0)
            {
                return Ok(new AddNewQuestionResponseDto
                {
                    Message = "New question is added to database",
                    Status = "Success"
                });
            }

            return BadRequest(new AddNewQuestionResponseDto
            {
                Message = "Operation failed.",
                Status = "Failed"
            });
        }


    }
}
