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
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService tokenService;
        private readonly DataContext context;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, TokenService tokenService, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.context = context;
        }

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
                County = registerDto.County

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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user),
                County = user.County

            };
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserBook>> GetUser(Guid id)
        {
            var user = await userManager.FindByIdAsync(id.ToString());
            var books = await context.Books.ToListAsync();
            List<Book> userBooks = new List<Book>();

            foreach (Book b in books)
            {
                if (b.AppUserId == id.ToString()) userBooks.Add(b);
            }


            var userPhotos = await context.Users.Include(user => user.Photos)
                   .SingleOrDefaultAsync(u => u.UserName == user.UserName);

            var mainImage = userPhotos!.Photos.ToArray().First((photo => photo.IsMain));

            string image = new String("");
            if(mainImage != null){
                image = mainImage.Url;
            }

            return new UserBook
            {
                UserId = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Email = user.Email,
                County = user.County,
                Image = image,
                Books = userBooks,
            };
        }

    }
}