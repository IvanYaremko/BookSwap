using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used when a client-app wants to authenticate with the application.
    /// The AllowAnonymous tag is enabled since the client needs to authenticate.
    /// This controller is responsible for registering the user, logging in the user, and getting the current logged in user.
    /// </summary>
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<AppUser> userManager;

        private readonly SignInManager<AppUser> signInManager;

        private readonly TokenService tokenService;

        private readonly DataContext context;

        /// <summary>
        /// This endpoint is used for Inversion of Control and injection for common services required.
        /// </summary>
        /// <param name="userManager">Used to manipulate the user storage</param>
        /// <param name="signInManager">Used to manipulate the sign in storage</param>
        /// <param name="tokenService">Used for JWT management</param>
        /// <param name="context">Used for database storage management</param>
        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, TokenService tokenService, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        /// <summary>
        /// This endpoint expects from the client a login data transfor object.
        /// It uses the information in this object to verify and authenticate the login attempt.
        /// </summary>
        /// <param name="loginDto">The login data transfor object</param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return ValidationProblem("Invalid email");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (result.Succeeded)
            {
                return new UserDto
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = tokenService.CreateToken(user),
                    County = user.County
                };
            }

            return ValidationProblem("Invalid password");
        }

        /// <summary>
        /// This endpoint endpoint is responsible for registering a user as a member of the application.
        /// The endpoint expexts a register data transfer object to retrieve the user details.
        /// </summary>
        /// <param name="registerDto">The register data transfer object</param>
        /// <returns></returns>

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(user => user.Email == registerDto.Email))
            {
                return ValidationProblem("Email taken");
            }
            if (await userManager.Users.AnyAsync(user => user.UserName == registerDto.UserName))
            {
                return ValidationProblem("Username taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                County = registerDto.County,
                Bio = registerDto.Bio,
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    DisplayName = user.DisplayName,
                    Token = tokenService.CreateToken(user),
                    County = user.County
                };
            }

            return BadRequest("Error registrating user");
        }

        /// <summary>
        /// This endpoint is used to retrieve the current logged in user.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.Users.Include(u => u.Photos)
            .FirstOrDefaultAsync(user => user.Email == User.FindFirstValue(ClaimTypes.Email));

            var isImage = user.Photos.FirstOrDefault(p => p.IsMain);
            string mainImage = "";

            if (isImage != null) mainImage = isImage.Url;
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user),
                County = user.County,
                Image = mainImage
            };
        }



    }
}