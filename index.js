//------------------------------------------------------------------------------
//-------------------------------IMPLEMENT PACKAGES-----------------------------
//------------------------------------------------------------------------------

//require packages
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  cors = require('cors'),
  Models = require('./models.js'),
  validator = require('express-validator'),
  dotenv = require('dotenv').config();

require('./passport');
//encapsulate express functionality
const app = express();

//Connect to local/remote database via env. file
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

//invoke bodyParser for POST requests
app.use(bodyParser.json());
//invoke cors always after bodyParser!
app.use(cors());
//import auth.is (remember always after body parser)
var auth = require('./auth.js')(app);
//invoke express-validator
app.use(validator());

//declare models
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//route requests for static files to public folder
app.use(express.static('public'));

//invoke morgan => requests logged used Morgan´s common format!! (::1 - - [30/Nov/2018:05:43:09 +0000] 'GET /secreturl HTTP/1.1' 200 51)
app.use(morgan('common'));

//Error handling middleware func
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops  ..something broke!');
});

//------------------------------------------------------------------------------
//-----------------------------FUNCTIONS HERE-----------------------------------
//------------------------------------------------------------------------------

//-------------------------------GET FUNCTIONS----------------------------------

//Get a JSON-Obj with whole movies list
//app.get('/movies', passport.authenticate('jwt', {session: false}),(req, res) => {
app.get('/movies',(req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Request error: ' + err);
  });
});

//Get a JSON Obj with details of a movie selected by title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({Title: req.params.title})
  .then((movie) => {
    res.status(201).json(movie)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Request error: ' + err);
  });
});

//Get movie's genre by title
app.get('/movies/:title/genre', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({Title: req.params.title})
  .then((movie) => {
    res.status(201).json(movie.Genre)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Request error: ' + err);
  });
});

//Get a JSON OBJ with details of a director by name
app.get('/movies/directors/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({'Director.Name': req.params.name})
  .then((movie) => {
    res.status(201).json(movie.Director)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Request error: ' + err);
  });
});

//-----------------------------POST FUNCTIONS-----------------------------------

//create a new user

/*Input is a JSON Object containing:
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
*/

app.post('/users', (req, res) => {
  // Validation logic here for request
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username }) // Search to see if a user with the requested username already exists
  .then(function(user) {
    if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//Add a favourite movie to the user profile
app.post('/users/:username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.username }, {
    $push: { FavouriteMovies : req.params.MovieID
  }},
  { new : true },  // This line makes sure that the updated document is returned
  (error, updatedUser) => {
    if(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

//---------------------------------PUT FUNCTIONS--------------------------------
//User´s details update by username
/*Input is a JSON Object containing:
ID: Integer,
Username: String, (required)
Password: String, (required)
Email: String,    (required)
Birthday: Date
*/
app.put('/users/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }
var hashedPassword= Users.hashPassword(req.body.Password);
  Users.update({ Username : req.params.username }, { $set: {
    Username : req.body.Username,
    Password : hashedPassword,
    EMail : req.body.EMail,
    Birthday : req.body.Birthday,
  }},
  { new : true },  // This line makes sure that the updated document is returned
  (error, updatedUser) => {
    if(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

//-----------------------------DELETE FUNCTIONS---------------------------------

//Delete a favourite movie from user profile
app.delete('/users/:username/movies/:movieid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.username }, { $pull: {
    FavouriteMovies : req.params.movieid
  }},
  { new : true },  // This line makes sure that the updated document is returned
  (error, updatedUser) => {
    if(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

app.delete('/users/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username : req.params.username})
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.username + ' was not found')
    } else {
      res.status(200).send(req.params.username + ' was deleted')
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error)
  });
});

/*
//request listener (local)
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
*/

//request listener (Online)
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
