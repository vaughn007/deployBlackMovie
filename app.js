var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Movie = require("./models/movie");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedsDB =require("./seeds");

var commentRoutes = require("./routes/comments"),
    movieRoutes = require("./routes/movies"),
    indexRoutes = require("./routes/index");
    


//seedsDB(); //it will run when server is stared. seed the database
app.use(flash()); //for err mesages
//passport Config
app.use(require("express-session")({
    secret: "Hello web",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); //need for passport
app.use(passport.session()); //need for passport
passport.use(new LocalStrategy(User.authenticate())); //get passport-local, and passportLocalMongoose form user.ejs. this is the middleware
passport.serializeUser(User.serializeUser());  //responable for reading session. it incode sessions
passport.deserializeUser(User.deserializeUser()); //responable for reading session. it decode sessions

//this will be called on every route. middleware
app.use(function (req, res, next) {
    res.locals.currentUser = req.user; //avlible inside temlets
    res.locals.error = req.flash("error"); //for err display
    res.locals.success = req.flash("success"); //for err display success
    next(); //next will move on to next middleware. Without it, it stop
});


app.use(methodOverride("_method")); //Place before routs to pages


//get the pages. It tell app to use the 3 files we required
app.use(indexRoutes);
app.use("/movies", movieRoutes); //all movie routes should start with movies. it put movies in font of route
app.use("/movies/:id/comments", commentRoutes);

//#### for cloud mongo DB Alas
mongoose.connect('mongodb+srv://WebDev:I_lovegirls69@cluster0-vj0ha.mongodb.net/black_Movie?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
}); //database connecting mongo DB atlas in cloud

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //css __dirname is fold scrip ran in

//app.use(methodOverride("_method")); //tell it what to look for


 
//seed data for testing
/* Movie.create(
    {
        name: "Mountain Goat Rest", 
        image: "https://farm7.staticflickr.com/6210/6030034884_5fbfeac322.jpg",
        description: "This is a very pretty place bring your family down to check it out"
    }, 
    function(err, movie) {
    if (err) {
        console.log(err);
    } else {
        console.log("New movie !!");
        console.log(movie);
        
    }
}); */

 
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
// app.listen(port, () => console.log(`movie app listening on port ${port}!`));































































