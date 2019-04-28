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

//-------------------------------GET FUNCTIONS----------------------------------

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

/*Input is a JSON Object containing:
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
*/

app.post('/users', (req, res) => {
  Users.findOne({Username: req.body.Username})
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        EMail: req.body.EMail,
        Birthday: req.body.Birthday
      })
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
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
app.put('/users/:username', (req, res) => {
  Users.update({ Username : req.params.username }, { $set: {
    Username : req.body.Username,
    Password : req.body.Password,
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

//Add a favourite movie to the user profile
app.put('/users/:username/movies/:movieid', (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.username }, { $push: {
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

//-----------------------------DELETE FUNCTIONS---------------------------------

//Delete a favourite movie from user profile
app.delete('/users/:username/movies/:movieid', (req, res) => {
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

app.delete('/users/:username', (req, res) => {
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

//request listener
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
