namespace quiz_server.Configuration
{
    public class AuthenticationResult
    {
        public AuthenticationResult()
        {
            this.Errors = new List<string>();
        }
        public string? Token { get; set; }
        public bool Success { get; set; }
        public string Username { get; set; }
        public int Score { get; set; }
        public ICollection<string> Errors { get; set; }
    }
}
