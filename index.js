//------------------------------------------------------------------------------
//-------------------------------IMPLEMENT PACKAGES-----------------------------
//------------------------------------------------------------------------------

//require packages
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose');

//require mongoose models
const Models = require('./models.js');
//declare models
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
//route Mongoose to Database myMoviesDB
mongoose.connect('mongodb://localhost:27017/myMoviesDB', {useNewUrlParser: true});

//declare express var
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
//-----------------------------FUNCTIONS HERE-----------------------------------
//------------------------------------------------------------------------------

//------------------------------GETTER FUNCTIONS--------------------------------
//Get a JSON-Obj with whole movies list
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Get a JSON Obj with details of a movie selected by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title: req.params.title})
  .then((movie) => {
    res.status(201).json(movie)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Get a JSON OBJ with details of a genre selected by name
app.get('/genres/:name', (req, res) => {
  Genres.findOne({Name: req.params.title})
  .then((genre) => {
    res.status(201).json(genre)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Get a JSON OBJ with details of a director selected by name
app.get('/directors/:name', (req, res) => {
  Directors.findOne({Name: req.params.title})
  .then((director) => {
    res.status(201).json(director)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
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
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => {
     return user.username === req.params.username });

  if (user) {
    users.filter((obj) => {
      return obj.id !== req.params.username });
    res.status(201).send('User ' + req.params.username + ' was deleted.')
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
