//------------------------------------------------------------------------------
//-------------------------------IMPLEMENT PACKAGES-----------------------------
//------------------------------------------------------------------------------

//requiring packages
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

//route requests for static files to public folder
app.use(express.static('public'));
//invoke morgan => requests logged used Morgan´s common format!! (::1 - - [30/Nov/2018:05:43:09 +0000] 'GET /secreturl HTTP/1.1' 200 51)
app.use(morgan('common'));
//invoke bodyParser for POST requests
app.use(bodyParser.json());

//Error handling middleware func
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops ..something broke!');
});

//------------------------------------------------------------------------------
//----------------------IN-MEMORY OBJECTS FOR TESTING:--------------------------
//------------------------------------------------------------------------------

//Users-Objects
let users = [
  {
    id : '1',
    username : 'cesare83',
    password : 'password',
    email : 'cesare.marchesi@yahoo.it',
    birthday : '23/10/1983'
  }
];

//Directors-Objects
let directors = [
  {
    name : 'Alexander Payne',
    bio: 'Constantine Alexander Payne is an American film director, screenwriter, and producer, known for the films Election (1999), About Schmidt (2002), Sideways (2004), The Descendants (2011), Nebraska (2013), and Downsizing (2017). His films are noted for their dark humor and satirical depictions of contemporary American society. Payne is a two-time winner of the Academy Award for Best Adapted Screenplay, and a three-time nominee of the Academy Award for Best Director.',
    birth: '10/02/1961',
    death: '',
  },
  {
    name : 'Kevin Costner',
    bio: 'Kevin Michael Costner is an American actor, director, producer, and musician. His accolades include two Academy Awards, three Golden Globe Awards, one Primetime Emmy Award, and two Screen Actors Guild Awards.',
    birth: '18/01/1955',
    death: '',
  },
  {
    name : 'Quentin Tarantino',
    bio: 'Quentin Jerome Tarantino is an American filmmaker and actor. His films are characterized by nonlinear storylines, satirical subject matter, an aestheticization of violence, extended scenes of dialogue, ensemble casts consisting of established and lesser-known performers, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, and features of neo-noir film.',
    birth: '27/03/1963',
    death: '',
  },
  {
    name : 'Sergio Leone',
    bio: 'Sergio Leone  was an Italian film director, producer and screenwriter, credited as the inventor of the Spaghetti Western genre.',
    birth: '03/01/1929',
    death: '30/04/1989',
  },
  {
    name : 'Ridley Scott',
    bio: 'Sir Ridley Scott  is an English film director and producer. Following his commercial breakthrough with the science fiction horror film Alien (1979), further works include the neo-noir dystopian science fiction film Blade Runner, historical drama Gladiator (which won the Academy Award for Best Picture), and science fiction film The Martian.',
    birth: '30/11/1937',
    death: '',
  },
  {
    name : 'Florian Henckel von Donnersmarck',
    bio: 'Florian Maria Georg Christian Graf Henckel von Donnersmarck is a German film director, best known for writing and directing the 2006 Oscar-winning dramatic thriller The Lives of Others, the 2010 three time Golden Globe nominated romantic thriller The Tourist, starring Angelina Jolie and Johnny Depp and the two-time Oscar-nominated 2018 epic drama Never Look Away.',
    birth: '02/05/1973',
    death: '',
  },
  {
    name : 'Park Chan-wook',
    bio: 'Park Chan-wook is a South Korean film director, screenwriter, producer, and former film critic. One of the most acclaimed and popular filmmakers in his native country, Park is best known for his films Joint Security Area (2000), Thirst (2009), The Handmaiden (2016) and what has become known as The Vengeance Trilogy, consisting of Sympathy for Mr. Vengeance (2002), Oldboy (2003) and Lady Vengeance (2005).',
    birth: '23/08/1963',
    death: '',
  },
  {
    name : 'Coen brothers',
    bio: "Joel Coen and Ethan Coen, collectively referred to as the Coen brothers, are American filmmakers. Their films span many genres and styles, which they frequently subvert or parody.[2] Their most acclaimed works include Miller's Crossing (1990), Barton Fink (1991), Fargo (1996), The Big Lebowski (1998), No Country for Old Men (2007), True Grit (2010), and Inside Llewyn Davis (2013).",
    birth: '29/11/1954, 21/09/1957',
    death: '',
  },
  {
    name : 'Alejandro González Iñárritu',
    bio: 'Alejandro González Iñárritu is a Mexican film director, producer, and screenwriter. His feature films have garnered critical acclaim and numerous accolades, including five Academy Awards. In 2006, he became the first Mexican director to be nominated for the Academy Award for Best Director and the Directors Guild of America Award for Outstanding Directing for Babel. In 2015, he won three Academy Awards: Best Picture, Best Director, and Best Original Screenplay for Birdman or (The Unexpected Virtue of Ignorance). The following year, he won a second Academy Award for Best Director for The Revenant (2015), making him the third director to win back to back Academy Awards, and the first since 1950. Iñárritu was awarded a Special Achievement Academy Award for his virtual reality project Flesh and Sand in 2017, the first time it had been awarded since 1995. In 2019, Alejandro González Iñárritu was named the President of the jury of the 72nd Cannes Film Festival',
    birth: '15/08/1963',
    death: '',
  },
  {
    name : 'Bernardo Bertolucci',
    bio: 'Bernardo Bertolucci was an Italian director and screenwriter, whose films include The Conformist, Last Tango in Paris, 1900, The Last Emperor (for which he won the Academy Award for Best Director and the Academy Award for Best Adapted Screenplay), The Sheltering Sky, Little Buddha, Stealing Beauty and The Dreamers.',
    birth: '16/03/1941',
    death: '26/11/2018',
  }
];

//Movie-Objects
let favouriteMovies = [
  {
    title : 'Sideways',
    description: "Sideways is a 2004 American comedy-drama film directed by Alexander Payne and written by Jim Taylor and Payne. A film adaptation of Rex Pickett's novel of the same name, Sideways follows two men in their forties, Miles Raymond (Paul Giamatti), a depressed teacher and unsuccessful writer, and Jack Cole (Thomas Haden Church), a past-his-prime actor, who take a week-long road trip to Santa Barbara County wine country to celebrate Jack's upcoming wedding. Sandra Oh and Virginia Madsen also star. The film premiered at the Toronto International Film Festival on September 13, 2004, and was released in the United States on October 22, 2004. Sideways won the Academy Award for Best Adapted Screenplay, and was nominated for Best Picture, Best Director, Best Supporting Actor (Haden Church) and Best Supporting Actress (Madsen).",
    genre: 'comedy, drama, romance',
    director: 'Alexander Payne',
    image: 'https://m.media-amazon.com/images/M/MV5BMTU0Mjg3MzkxOV5BMl5BanBnXkFtZTYwNDU1OTY3._V1_.jpg'
  },
  {
    title : 'Dance with Wolves',
    description: 'Dances with Wolves is a 1990 American epic Western film starring, directed and produced by Kevin Costner. It is a film adaptation of the 1988 book of the same name by Michael Blake that tells the story of Union Army lieutenant John J. Dunbar (Costner) who travels to the American frontier to find a military post and of his dealings with a group of Lakota Indians.',
    genre: 'adventure, drama, western',
    director: 'Kevin Costner',
    image: 'https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTcwNDA0NDY3Mw@@._V1_SY1000_CR0,0,666,1000_AL_.jpg'
  },
  {
    title : 'Pulp Fiction',
    description: "Pulp Fiction is a 1994 American crime film written and directed by Quentin Tarantino; it is based on a story by Tarantino and Roger Avary.[4] Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles. The film's title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue.",
    genre: 'crime, drama',
    director: 'Quentin Tarantino',
    image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg'
  },
  {
    title : 'The Good, the Bad and the Ugly',
    description: "The Good, the Bad and the Ugly is a 1966 Italian epic Spaghetti Western film directed by Sergio Leone and starring Clint Eastwood, Lee Van Cleef, and Eli Wallach in their respective title roles. Its screenplay was written by Age & Scarpelli, Luciano Vincenzoni and Leone (with additional screenplay material and dialogue provided by an uncredited Sergio Donati), based on a story by Vincenzoni and Leone. Director of photography Tonino Delli Colli was responsible for the film's sweeping widescreen cinematography, and Ennio Morricone composed the film's score including its main theme. It is an Italian-led production with co-producers in Spain, West Germany and the United States.",
    genre: 'spaghetti western',
    director: 'Sergio Leone',
    image: 'https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SY1000_CR0,0,656,1000_AL_.jpg'
  },
  {
    title : 'Blade Runner',
    description: "Blade Runner is a 1982 science fiction film directed by Ridley Scott, written by Hampton Fancher and David Peoples, and starring Harrison Ford, Rutger Hauer, and Sean Young. It is a loose adaptation of Philip K. Dick's novel Do Androids Dream of Electric Sheep? (1968). The film is set in a dystopian future Los Angeles of 2019, in which synthetic humans known as replicants are bio-engineered by the powerful Tyrell Corporation to work on off-world colonies. When a fugitive group of Nexus-6 replicants led by Roy Batty (Hauer) escapes back to Earth, burnt-out cop Rick Deckard (Ford) reluctantly agrees to hunt them down.",
    genre: 'sci-fi, thriller',
    director: 'Ridley Scott',
    image: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,671,1000_AL_.jpg'
  },
  {
    title : 'The Lives of Others',
    description: "The Lives of Others is a 2006 German drama film, marking the feature film debut of filmmaker Florian Henckel von Donnersmarck, about the monitoring of East Berlin residents by agents of the Stasi, the GDR's secret police. It stars Ulrich Mühe as Stasi Captain Gerd Wiesler, Ulrich Tukur as his superior Anton Grubitz, Sebastian Koch as the playwright Georg Dreyman, and Martina Gedeck as Dreyman's lover, a prominent actress named Christa-Maria Sieland.",
    genre: 'drama, thriller',
    director: 'Florian Henckel von Donnersmarck',
    image: 'https://m.media-amazon.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_.jpg'
  },
  {
    title : 'Oldboy',
    description: 'Oldboy is a 2003 South Korean neo-noir action thriller film co-written and directed by Park Chan-wook. It is based on the Japanese manga of the same name written by Nobuaki Minegishi and Garon Tsuchiya. Oldboy is the second installment of The Vengeance Trilogy, preceded by Sympathy for Mr. Vengeance and followed by Lady Vengeance.',
    genre: 'action, drama, mistery',
    director: 'Park Chan-wook',
    image: 'https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_.jpg'
  },
  {
    title : 'The Big Lebowski',
    description: "The Big Lebowski (/ləˈbaʊski/) is a 1998 crime comedy film written, produced, and directed by Joel and Ethan Coen. It stars Jeff Bridges as Jeffrey 'The Dude' Lebowski, a Los Angeles slacker and avid bowler. He is assaulted as a result of mistaken identity, after which The Dude learns that a millionaire also named Jeffrey Lebowski was the intended victim. The millionaire Lebowski's trophy wife is kidnapped, and he commissions The Dude to deliver the ransom to secure her release; but the plan goes awry when the Dude's friend Walter Sobchak (John Goodman) schemes to keep the ransom money. Julianne Moore, Steve Buscemi, David Huddleston, and John Turturro also appear, in supporting roles.",
    genre: 'comedy, crime',
    director: 'Coen brothers',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SY1000_CR0,0,670,1000_AL_.jpg'
  },
  {
    title : 'Amores Perros',
    description: "Amores perros is a 2000 Mexican crime drama film directed by Alejandro González Iñárritu and written by Guillermo Arriaga. Amores perros is the first installment in González Iñárritu's 'Trilogy of Death', succeeded by 21 Grams and Babel. It is an anthology film constructed as a triptych: it contains three distinct stories connected by a car accident in Mexico City. The stories centre on a teenager in the slums who gets involved in dogfighting; a model who seriously injures her leg; and a mysterious hitman. The stories are linked in various ways, including the presence of dogs in each of them.",
    genre: 'drama, thriller',
    director: 'Alejandro González Iñárritu',
    image: 'https://m.media-amazon.com/images/M/MV5BMWJhOTg5MWQtYTJjMi00YmFkLTg4ODgtYmU2YWVhODQ4ZDM3XkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg'
  },
  {
    title : 'The Last Emperor',
    description: "The Last Emperor is a 1987 British-Italian epic biographical drama film about the life of Puyi, the last Emperor of China, whose autobiography was the basis for the screenplay written by Mark Peploe and Bernardo Bertolucci. Independently produced by Jeremy Thomas, it was directed by Bertolucci and released in 1987 by Columbia Pictures. Puyi's life is depicted from his ascent to the throne as a small boy to his imprisonment and political rehabilitation by the Communist Party of China. The film stars John Lone as Puyi, with Joan Chen, Peter O'Toole, Ruocheng Ying, Victor Wong, Dennis Dun, Ryuichi Sakamoto, Maggie Han, Ric Young, Vivian Wu, and Chen Kaige. It was the first Western feature film authorized by the People's Republic of China to film in the Forbidden City in Beijing. It won 9 Academy Awards, including Best Picture and Best Director, at the 60th iteration of the event.",
    genre: 'biography, drama, history',
    director: 'Bernardo Bertolucci',
    image: 'https://m.media-amazon.com/images/M/MV5BZTk0NDU4YmItOTk0ZS00ODc2LTkwNGItNWI5MDJkNTJiYWMxXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg'
  }
];

//------------------------------------------------------------------------------
//-----------------------------FUNCTIONS HERE-----------------------------------
//------------------------------------------------------------------------------

//------------------------------GETTER FUNCTIONS--------------------------------
//JSON-Obj with whole movies list
app.get('/movies', (req, res) => {
  res.json(favouriteMovies)
});

//JSON-Obj with movie details of selected movie
app.get("/movies/:title", (req, res) => {
  res.json(favouriteMovies.find( (movie) => {
    return movie.title === req.params.title
  }));
});

//JSON-Obj with director details of selected director
app.get("/directors/:name", (req, res) => {
  res.json(directors.find( (director) => {
    return director.name === req.params.name
  }));
});

//-----------------------------POST FUNCTIONS-----------------------------------
//create a new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
      res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//create a new favouriteMovie
app.post('/movies', (req, res) => {
  let newFavouriteMovie = req.body;

  if (!newFavouriteMovie.title) {
    const message = 'Missing title in request body';
      res.status(400).send(message);
  } else {
    favouriteMovies.push(newFavouriteMovie);
    res.status(201).send(newFavouriteMovie);
  }
});

//---------------------------------PUT FUNCTIONS--------------------------------
//User´s details update by username
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });

  if (user) {
    user.username = req.params.username;
    user.password = req.params.password;
    user.email = req.params.email;
    user.birthday = req.params.birthday;
    res.status(201).send('Personal data has been changed');
  } else {
    res.status(404).send('No user found with the name ' + req.params.username)
  }
});

//-----------------------------DELETE FUNCTIONS---------------------------------
//Delete user by name
app.delete("/users/:username", (req, res) => {
  let user = users.find((user) => {
     return user.username === req.params.username });

  if (user) {
    users.filter((obj) => {
      return obj.id !== req.params.username });
    res.status(201).send("User " + req.params.username + " was deleted.")
  } else {
    res.status(404).send('No user found with the name ' + req.params.username)
  }
});

//Delete favourite movie by title
app.delete('/movies/:title', (req, res) => {
  let favouriteMovie = favouriteMovies.find((obj) =>
    { return obj.title === req.params.title });

  if (favouriteMovies) {
    favouriteMovies.filter( (obj) => {
      return obj.title !== req.params.title});
      res.status(201).send(req.params.title + ' has been deleted.')
  } else {
    res.status(404).send('No movie found with the name ' + req.params.title)
  }
});

//request listener
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
