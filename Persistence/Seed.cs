using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{

    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Books.Any())
            {
                var userList = new List<AppUser>
                {
                    new AppUser{DisplayName="Jane Doe", UserName="jane", Email="jane@email.com", County="Carlow", Bio="Hi my name is Jane."},
                    new AppUser{DisplayName="John Doe", UserName="john", Email="john@email.com", County="Carlow", Bio="Hi my name is John."},
                    new AppUser{DisplayName="Fedor Illych", UserName="fedor", Email="fedor@email.com", County="Carlow", Bio="Hi my name is Fedor."},
                    new AppUser{DisplayName="Tom Lynch", UserName="tom", Email="tom@email.com", County="Carlow", Bio="Hi my name is Tom."},
                    new AppUser{DisplayName="Bob Reilly", UserName="fedor", Email="bob@email.com", County="Carlow", Bio="Hi my name is Bob."},
                    new AppUser{DisplayName="Phil O'Rourke", UserName="phil", Email="phil@email.com", County="Carlow", Bio="Hi my name is Phil."},
                };

                // This loop will do the work required to create the user, set a password, and 
                // store the user into the database. The DataContext was provided in the IdentityServicesExtensions
                foreach (var user in userList)
                {
                    await userManager.CreateAsync(user, "P@$$w0rd");
                }
                var books = new List<Book>
                {
                    new Book
                    {
                        Author = "Jane Austen",
                        Title = "Pride and Prejudice",
                        Pages = 320,
                        County ="carlow",
                        AppUserId = userList[0].Id,
                        Synopsys = "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
                        Binding = "Paperback",
                        Isbn13 = "9780679783268",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/32/68/9780679783268.jpg"
                    },
                    new Book
                    {
                        Author = "Ishiguro, Kazuo",
                        Title = "Never Let Me Go",
                        Pages = 288,
                        County ="carlow",
                        AppUserId = userList[0].Id,
                        Synopsys = "From The Booker Prize-winning Author Of The Remains Of The Day And When We Were Orphans, Comes An Unforgettable Edge-of-your-seat Mystery That Is At Once Heartbreakingly Tender And Morally Courageous About What It Means To Be Human. Hailsham Seems Like A Pleasant English Boarding School, Far From The Influences Of The City. Its Students Are Well Tended And Supported, Trained In Art And Literature, And Become Just The Sort Of People The World Wants Them To Be. But, Curiously, They Are Taught Nothing Of The Outside World And Are Allowed Little Contact With It. Within The Grounds Of Hailsham, Kathy Grows From Schoolgirl To Young Woman, But It's Only When She And Her Friends Ruth And Tommy Leave The Safe Grounds Of The School (as They Always Knew They Would) That They Realize The Full Truth Of What Hailsham Is. Kazuo Ishiguro.",
                        Binding = "Paperback",
                        Isbn13 = "9781400044832",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/87/76/9781400078776.jpg"
                    },
                    new Book
                    {
                        Author = "Chabon, Michael",
                        Title = "The Amazing Adventures of Kavalier & Clay",
                        Pages = 639,
                        County ="carlow",
                        AppUserId = userList[0].Id,
                        Synopsys = "This brilliant epic novel set in New York and Prague introduces us to two misfit young men who make it big by creating comic-book superheroes. Joe Kavalier, a young artist who has also been trained in the art of Houdiniesque escape, has just smuggled himself out of Nazi-invaded Prague and landed in New York City. His Brooklyn cousin Sammy Clay is looking for a partner to create heroes, stories, and art for the latest novelty to hit America the comic book.",
                        Binding = "Paperback",
                        Isbn13 = "9780312282998",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/29/98/9780312282998.jpg"
                    },
                    new Book
                    {
                        Author = "Hanya Yanagihara",
                        Title = "The People in the Trees & A Little Life",
                        Pages = 832,
                        County = "carlow",
                        AppUserId = userList[2].Id,
                        Synopsys = "When Four Classmates From A Small Massachusetts College Move To New York To Make Their Way, They're Broke, Adrift, And Buoyed Only By Their Friendship And Ambition ... Over The Decades, Their Relationships Deepen And Darken, Tinged By Addiction, Success, And Pride..",
                        Binding = "Paperback",
                        Isbn13 = "9780385539265",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/27/07/9780804172707.jpg"
                    },
                    new Book
                    {
                        Author = "Collins, Suzanne",
                        Title = "The Hunger Games",
                        Pages = 384,
                        County = "carlow",
                        AppUserId = userList[2].Id,
                        Synopsys = "In A Future North America, Where The Rulers Of Panem Maintain Control Through An Annual Televised Survival Competition Pitting Young People From Each Of The Twelve Districts Against One Another, Sixteen-year-old Katniss's Skills Are Put To The Test When She Voluntarily Takes Her Younger Sister's Place.",
                        Binding = "Paperback",
                        Isbn13 = "9780439023481",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/34/81/9780439023481.jpg"
                    },
                    new Book
                    {
                        Author = "Stockett, Kathryn",
                        Title = "The Help",
                        Pages = 464,
                        County = "carlow",
                        AppUserId = userList[2].Id,
                        Synopsys = "An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African American maids' point of view on the white families for which they work, and the hardships they go through on a daily basis.",
                        Binding = "Hardcover",
                        Isbn13 = "9781440697661",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/53/45/9780399155345.jpg"
                    },
                    new Book
                    {
                        Author = "Pierce Brown",
                        Title = "Red Rising",
                        Pages = 382,
                        County = "carlow",
                        AppUserId = userList[5].Id,
                        Synopsys = "Red Rising is a 2014 dystopian science fiction novel by American author Pierce Brown, and the first book and eponym of a series. The novel, set on a future planet Mars, follows lowborn miner Darrow as he infiltrates the ranks of the elite Golds. Red Rising has received generally positive reviews.",
                        Binding = "Hardcover",
                        Isbn13 = "9780345539793",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/97/86/9780345539786.jpg"
                    },
                     new Book
                    {
                        Author = "Owens, Delia",
                        Title = "Where the Crawdads Sing",
                        Pages = 379,
                        County = "carlow",
                        AppUserId = userList[5].Id,
                        Synopsys = "It's about a young woman named Kya, who's left to raise herself in the marshes of North Carolina when her family abandons her at a young age. There is so much to her story: romance, mystery, and a murder… and it takes place in the breathtaking backdrop of the South.",
                        Binding = "Paperback",
                        Isbn13 = "9780735219113",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/91/13/9780735219113.jpg"
                    },
                    new Book
                    {
                        Author = "Haig, Matt",
                        Title = "The Midnight Library: A Novel",
                        Pages = 304,
                        County = "carlow",
                        AppUserId = userList[5].Id,
                        Synopsys = "Between Life And Death There Is A Library. When Nora Seed Finds Herself In The Midnight Library, She Has A Chance To Make Things Right. Up Until Now, Her Life Has Been Full Of Misery And Regret. She Feels She Has Let Everyone Down, Including Herself. But Things Are About To Change. The Books In The Midnight Library Enable Nora To Live As If She Had Done Things Differently. With The Help Of An Old Friend, She Can Now Undo Every One Of Her Regrets As She Tries To Work Out Her Perfect Life. But Things Aren't Always What She Imagined They'd Be, And Soon Her Choices Place The Library And Herself In Extreme Danger. Before Time Runs Out, She Must Answer The Ultimate Question: What Is The Best Way To Live?",
                        Binding = "Paperback",
                        Isbn13 = "9781443455879",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/58/79/9781443455879.jpg"
                    },
                    new Book
                    {
                        Author = "Ryan, Anthony",
                        Title = "The Pariah",
                        Pages = 304,
                        County = "carlow",
                        AppUserId = userList[1].Id,
                        Synopsys = "The Pariah Begins A New Epic Fantasy Series Of Action, Intrigue And Magic From Anthony Ryan, A Master Storyteller Who Has Taken The Fantasy World By Storm. Born Into The Troubled Kingdom Of Albermaine, Alwyn Scribe Is Raised As An Outlaw. Quick Of Wit And Deft With A Blade, Alwyn Is Content With The Freedom Of The Woods And The Comradeship Of His Fellow Thieves. But An Act Of Betrayal Sets Him On A New Path - One Of Blood And Vengeance, Which Eventually Leads Him To A Soldier's Life In The King's Army. Fighting Under The Command Of Lady Evadine Courlain, A Noblewoman Beset By Visions Of A Demonic Apocalypse, Alwyn Must Survive War And The Deadly Intrigues Of The Nobility If He Hopes To Claim His Vengeance. But As Dark Forces, Both Human And Arcane, Gather To Oppose Evadine's Rise, Alwyn Faces A Choice: Can He Be A Warrior, Or Will He Always Be An Outlaw? Praise For Anthony Ryan 'a Master Storyteller' Mark Lawrence 'robin Hobb Meets Joe Abercrombie . . . This Is Fantasy With A Totally Legendary Feel' Fantasy Book Review 'the Wolf's Call Is Everything A Fantasy Fan Could Ever Wish For' Booknest 'fantastic Storytelling' Novel Notions",
                        Binding = "Hardcover",
                        Isbn13 = "9780356514550",
                        IsMarket = true,
                        Image = "https://images.isbndb.com/covers/45/50/9780356514550.jpg"
                    }
                };

                await context.Books.AddRangeAsync(books);
                await context.SaveChangesAsync();
            }
        }
    }
}