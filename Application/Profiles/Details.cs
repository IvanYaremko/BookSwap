using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(user => user.Photos)
                    .SingleOrDefaultAsync(user => user.UserName == request.UserName);
                var photos = await _context.Photos.ToListAsync();

                var mainImage = user.Photos.ToArray().First((photo => photo.IsMain));

                var profile = new Profile
                {
                    UserName = user.UserName,
                    DsiplayName = user.DisplayName,
                    Image = mainImage.Url,
                    Photos = user.Photos
                };
                return profile;
            }
        }
    }
}