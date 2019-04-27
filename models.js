//require Mongoose
const mongoose = require('mongoose');

//define movieSchema
var movieSchema = mongoose.Schema({
  Title : {type: String, required: true},
  Description : {type: String, required: true},
  Genre : { type : mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  Director : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Director' }],
  ImagePath : String,
  Featured : Boolean
});
//define userSchema
var userSchema = mongoose.Schema({
 Username : {type: String, required: true},
 Password : {type: String, required: true},
 Email : {type: String, required: true},
 Birthday : Date,
 FavoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});
//define genreSchema
var genreSchema = mongoose.Schema({
 Name : {type: String, required: true},
 Description : {type: String, required: true}
});
//define directorSchema
var directorSchema = mongoose.Schema({
 Name : {type: String, required: true},
 Bio : {type: String, required: true},
 Birthyear : {type: Date, required: true},
 Deathyear : Date
});
//create models
var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);
var Genre = mongoose.model('Movie', movieSchema);
var Director = mongoose.model('User', userSchema);
//export models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
