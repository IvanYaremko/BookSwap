using AutoMapper;
using Domain;

namespace Application.Core
{
    /// <summary>
    /// This clase uses the AutoMapper library to Map from one profile to another
    /// This class is utilised by the Update Command classes
    /// This automatically updates values in the specified objects
    /// </summary>
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, Book>();
        }
    }
}