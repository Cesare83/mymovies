//------------------------------------------------------------------------------
//-------------------------------IMPLEMENT PACKAGES-----------------------------
//------------------------------------------------------------------------------
//require packages
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
//running express enviroment
const app = express();

//------------------------------------------------------------------------------
//----------------------IN-MEMORY OBJECTS FOR TESTING:--------------------------
//------------------------------------------------------------------------------

//Directors-Objects
let directors = [
  {
    id: '1',
    name : 'uneven director',
    bio: 'uneven director biography',
    birth: 'uneven director´s birthday',
    death: 'still alive',
  },
  {
    id: '2',
    name : 'even director',
    bio: 'even director biography',
    birth: 'even director´s birthday',
    death: '10/10/2010',
  }
]

//Movie-Objects
let topMovies = [
  {
    id: '1',
    title : 'first movie',
    description: 'first movie description',
    genre: 'first movie genre',
    director: 'uneven director',
    image: 'first movie image'
  },
  {
    id: '2',
    title : 'second movie',
    description: 'second movie description',
    genre: 'second movie genre',
    director: 'even director',
    image: 'second movie image'
  },
  {
    id: '3',
    title : 'third movie',
    description: 'third movie description',
    genre: 'third movie genre',
    director: 'uneven director',
    image: 'third movie image'
  },
  {
    id: '4',
    title : 'fourth movie',
    description: 'fourth movie description',
    genre: 'fourth movie genre',
    director: 'even director',
    image: 'fourth movie image'
  },
  {
    id: '5',
    title : 'fifth movie',
    description: 'fifth movie description',
    genre: 'fifth movie genre',
    director: 'uneven director',
    image: 'fifth movie image'
  },
  {
    id: '6',
    title : 'sixth movie',
    description: 'sixth movie description',
    genre: 'sixth movie genre',
    director: 'even director',
    image: 'sixth movie image'
  },
  {
    id: '7',
    title : 'seventh movie',
    description: 'seventh movie description',
    genre: 'seventh movie genre',
    director: 'uneven director',
    image: 'seventh movie image'
  },
  {
    id: '8',
    title : 'eighth movie',
    description: 'eighth movie description',
    genre: 'eighth movie genre',
    director: 'even director',
    image: 'eighth movie image'
  },
  {
    id: '9',
    title : 'nineth movie',
    description: 'nineth movie description',
    genre: 'nineth movie genre',
    director: 'uneven director',
    image: 'nineth movie image'
  },
  {
    id: '10',
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

//route requests for static files to public folder
app.use(express.static('public'));
//invoke morgan => requests logged used Morgan´s common format!! (::1 - - [30/Nov/2018:05:43:09 +0000] 'GET /secreturl HTTP/1.1' 200 51)
app.use(morgan('common'));
//Error handling middleware func
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops ..something broke!');
});

=======
//require packages
const express = require('express'),
  morgan = require('morgan');
//running express enviroment
const app = express();

//route requests for static files to public folder
app.use(express.static('public'));
//invoke morgan => requests logged used Morgan´s common format!! (::1 - - [30/Nov/2018:05:43:09 +0000] "GET /secreturl HTTP/1.1" 200 51)
app.use(morgan('common'));
//Error handling middleware func
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops ..something broke!');
});

//Test-Movie-Objects
let topMovies = [
  {
  title : "first movie",
  director: "first movie director"
  },
  {
  title : "second movie",
  director: "second movie director"
  },
  {
  title : "third movie",
  director: "third movie director"
  },
  {
  title : "fourth movie",
  director: "fourth movie director"
  },
  {
  title : "fifth movie",
  director: "fifth movie director"
  },
  {
  title : "sixth movie",
  director: "sixth movie director"
  },
  {
  title : "seventh movie",
  director: "seventh movie director"
  },
  {
  title : "eighth movie",
  director: "eight movie director"
  },
  {
  title : "nineth movie",
  director: "nineth movie director"
  },
  {
  title : "tenth movie",
  director: "tenth movie director"
  }
]

>>>>>>> 0d1d6bea8d43e011bd5c624bed5eb2f86f85d664
//GET requests
app.get('/', function(req, res) {
  res.send('Welcome to myFlix!')
});

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

//request listener
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
