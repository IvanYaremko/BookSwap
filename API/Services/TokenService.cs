using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

/// <summary>
/// This class is responsible in creating JWT Tokens.
/// docs https://jasonwatmore.com/post/2021/06/02/net-5-create-and-validate-jwt-tokens-use-custom-jwt-middleware
/// </summary>
public class TokenService
{
        public IConfiguration Config { get; }
    public TokenService(IConfiguration config)
    {
            Config = config;
    }

   public string CreateToken(AppUser appUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(Config["TokenKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, appUser.UserName),
                        new Claim(ClaimTypes.NameIdentifier, appUser.Id),
                        new Claim(ClaimTypes.Email, appUser.Email)
                    }),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
}
