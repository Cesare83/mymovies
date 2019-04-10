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
    id: '1',
    username : 'Cesare83',
    password: 'password',
    email: 'cesare.marchesi@yahoo.it',
    birthday: ['23','10','1983']
  }
]

//Directors-Objects
let directors = [
  {
    name : 'uneven director',
    bio: 'uneven director biography',
    birth: 'uneven director´s birthday',
    death: 'still alive',
  },
  {
    name : 'even director',
    bio: 'even director biography',
    birth: 'even director´s birthday',
    death: '10/10/2010',
  }
]

//Movie-Objects
let favouriteMovies = [
  {
    title : 'first movie',
    description: 'first movie description',
    genre: 'first movie genre',
    director: 'uneven director',
    image: 'first movie image'
  },
  {
    title : 'second movie',
    description: 'second movie description',
    genre: 'second movie genre',
    director: 'even director',
    image: 'second movie image'
  },
  {
    title : 'third movie',
    description: 'third movie description',
    genre: 'third movie genre',
    director: 'uneven director',
    image: 'third movie image'
  },
  {
    title : 'fourth movie',
    description: 'fourth movie description',
    genre: 'fourth movie genre',
    director: 'even director',
    image: 'fourth movie image'
  },
  {
    title : 'fifth movie',
    description: 'fifth movie description',
    genre: 'fifth movie genre',
    director: 'uneven director',
    image: 'fifth movie image'
  },
  {
    title : 'sixth movie',
    description: 'sixth movie description',
    genre: 'sixth movie genre',
    director: 'even director',
    image: 'sixth movie image'
  },
  {
    title : 'seventh movie',
    description: 'seventh movie description',
    genre: 'seventh movie genre',
    director: 'uneven director',
    image: 'seventh movie image'
  },
  {
    title : 'eighth movie',
    description: 'eighth movie description',
    genre: 'eighth movie genre',
    director: 'even director',
    image: 'eighth movie image'
  },
  {
    title : 'nineth movie',
    description: 'nineth movie description',
    genre: 'nineth movie genre',
    director: 'uneven director',
    image: 'nineth movie image'
  },
  {
    title : 'tenth movie',
    description: 'tenth movie description',
    genre: 'tenth movie genre',
    director: 'even director',
    image: 'tenth movie image'
  }
]

//------------------------------------------------------------------------------
//-----------------------------FUNCTIONS HERE-----------------------------------
//------------------------------------------------------------------------------

//------------------------------GETTER FUNCTIONS--------------------------------
//JSON-Obj with whole movies list
app.get('/movies', (req, res) => {
  res.json(topMovies)
});

//JSON-Obj with movie details of selected movie
app.get("/movies/:title", (req, res) => {
  res.json(topMovies.find( (movie) => {
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
  let newFavouriteMovies = req.body;

  if (!newFavouriteMovies.title) {
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
//Delete user by ID
app.delete("/users/:id", (req, res) => {
  let user = users.find((user) => {
     return user.id === req.params.id });

  if (user) {
    users.filter((obj) => {
      return obj.id !== req.params.id });
    res.status(201).send("User " + req.params.id + " was deleted.")
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
