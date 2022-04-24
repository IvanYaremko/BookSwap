using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    /// <summary>
    /// This class is used to retrieve the profile details of an AppUser.
    /// </summary>
    public class Details
    {
        /// <summary>
        /// The Query class contains the username property of the AppUser needed to be retrieved.
        /// </summary>
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;
            /// <summary>
            ///  The constructor to inject the required services into the class.
            /// </summary>
            /// <param name="context">The database context</param>
            public Handler(DataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// This method contains the necessary logic to retrieve the profile details.
            /// The user is retrived via the database context, as are the photos.
            /// the main photo from the collection is stored in local memory.
            /// A new profile object is created with the properties details of the retrieved AppUser data store object.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(user => user.Photos)
                    .SingleOrDefaultAsync(user => user.UserName == request.UserName);

                var isMainImage = user.Photos.ToArray().FirstOrDefault(photo => photo.IsMain);
                string mainImage = "";
                if (isMainImage != null) mainImage = isMainImage.Url;

                var profile = new Profile
                {
                    UserName = user.UserName,
                    DsiplayName = user.DisplayName,
                    Image = mainImage,
                    Photos = user.Photos,
                    Bio = user.Bio,
                    County = user.County
                };
                return profile;
            }
        }
    }
}