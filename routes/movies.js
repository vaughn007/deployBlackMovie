var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware"); //index.js file inside middleware folder

//INDEX - show all movie

// search logic /////////////////
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all movies from DB
        Movie.find({name: regex}, function(err, allMovies){
           if(err){
               console.log(err);
           } else {
              if(allMovies.length < 1) {
                  noMatch = "Sorry... your search for this movie returned no videos";
              }
              res.render("movies/index",{movies:allMovies, noMatch: noMatch});
           }
        });
    } else {
        // Get all movies from DB
        Movie.find({}, function(err, allMovies){
           if(err){
               console.log(err);
           } else {
              res.render("movies/index",{movies:allMovies, noMatch: noMatch});
           }
        });
    }
});

//INDEX - show all movies
// router.get("/", function(req, res){
//     // Get all movies from DB
//     Movie.find({}, function(err, allMovies){
//        if(err){
//            console.log(err);
//        } else {
//           res.render("movies/index",{movies:allMovies});
//        }
//     });
// });

//CREATE - add new movie to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to movies array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
	var trailer = req.body.trailer;
	var stars = req.body.stars;
	var year = req.body.year;
	var director = req.body.director;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovie = {name: name, price: price, image: image, description: desc, trailer: trailer, stars: stars, year: year, director: director, author:author}
    // Create a new movie and save to DB
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to movies page
            console.log(newlyCreated);
            res.redirect("/movies");
        }
    });
});

//NEW - show form to create new movie
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("movies/new"); 
});

// SHOW - shows more info about one movie
router.get("/:id", function(req, res){
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err || !foundMovie){
            req.flash("error", "Movie not found");
            res.redirect("back");
        } else {
            console.log(foundMovie)
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

// EDIT movie ROUTE
router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        res.render("movies/edit", {movie: foundMovie});
    });
});

// UPDATE movie ROUTE
router.put("/:id",middleware.checkMovieOwnership, function(req, res){
    // find and update the correct movie
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
       if(err){
           res.redirect("/movies");
       } else {
           //redirect somewhere(show page)
           res.redirect("/movies/" + req.params.id);
       }
    });
});

// DESTROY movie ROUTE
router.delete("/:id",middleware.checkMovieOwnership, function(req, res){
   Movie.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/movies");
      } else {
          res.redirect("/movies");
      }
   });
});

//for searching
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;










// var express = require("express");
// var router  = express.Router();
// var Movie = require("../models/movie");
// var middleware = require("../middleware");


// //INDEX - show all movies
// router.get("/", function(req, res){
//     // Get all movies from DB
//     Movie.find({}, function(err, allMovies){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("movies/index",{movies:allMovies});
//       }
//     });
// });

// //CREATE - add new movie to DB
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // get data from form and add to movies array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
//     var newMovie = {name: name, image: image, description: desc, author:author}
//     // Create a new movie and save to DB
//     Movie.create(newMovie, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to movies page
//             console.log(newlyCreated);
//             res.redirect("/movies");
//         }
//     });
// });

// //NEW - show form to create new movie
// router.get("/new", middleware.isLoggedIn, function(req, res){
//   res.render("movies/new"); 
// });

// // SHOW - shows more info about one movie
// router.get("/:id", function(req, res){
//     //find the movie with provided ID
//     Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundMovie)
//             //render show template with that movie
//             res.render("movies/show", {movie: foundMovie});
//         }
//     });
// });

// // EDIT movie ROUTE
// router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res){
//     Movie.findById(req.params.id, function(err, foundMovie){
//         res.render("movies/edit", {movie: foundMovie});
//     });
// });

// // UPDATE movie ROUTE
// router.put("/:id",middleware.checkMovieOwnership, function(req, res){
//     // find and update the correct movie
//     Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
//       if(err){
//           res.redirect("/movies");
//       } else {
//           //redirect somewhere(show page)
//           res.redirect("/movies/" + req.params.id);
//       }
//     });
// });

// // DESTROY movie ROUTE
// router.delete("/:id",middleware.checkMovieOwnership, function(req, res){
//   Movie.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/movies");
//       } else {
//           res.redirect("/movies");
//       }
//   });
// });


// module.exports = router;












// var express = require("express");
// var router  = express.Router();
// var Movie = require("../models/movie");   //add in the right model.  yelpCamp/models/movie

// //index show all movies 
// router.get("/", function(req, res){  // only "/" because app.use("/movies", campgroundRoutes) All  movie Routes are movies
//     //console.log(req.user); it have username ID
//     //Get all campgrunds from DB
//     Movie.find({}, function(err, allMovies ) {
//         if (err) {
//             console.log(err);
            
//         } else {
//             res.render("movies/index", {movies: allMovies}); //res.render("filer name", { we call it movies:  sorce of movies}); index inside movies folder
//             //res.render("movies/index", {movies: allMovies, currentUser: req.user});
            
//         }
//     });
    
// });

// //Create add new movies to database
// router.post("/", isLoggedIn, function(req, res){
//     //get data from form and add to array, and redirect back to movies page
    
//     //get data from form
//     var name = req.body.name;
//     var image = req.body.image; 
//     var desc = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
    
//     var newMovie = {name: name, image: image, description: desc, author:author};
//     //console.log(req.user);
    
//     //create a new movie and save to database
//     Movie.create(newMovie, function(err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(newlyCreated);
//             res.redirect("/movies");
//         }
//     })
    
    
// });


// //New show form to add movies. You need to routes for POST, One to show form and submit to another page. Must be first to ge id //page for form
// router.get("/new", isLoggedIn, function(req, res){ //add isLoggedIn to check if loggedin
//     res.render("movies/new.ejs"); //new.ejs inside movies folder
// });

// //Show- show more info about movie
// router.get("/:id", function(req, res){
//     //Find movie with provid ID, and than render show templet with that movie
//     Movie.findById(req.params.id).populate("comments").exec( function(err, foundMovie) { //finding movie populate comments on movie. exec will  do query we made
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(foundMovie);
//             //render show templet
//             res.render("movies/show", {movie: foundMovie}); //movies folder show.ejs file
            
//         }
//     })
//     //req.params.id //this get the id
    
//     //res.send("This will be the show page!!")
// });

// //Edit Movie Route. we need a form on edit
// router.get("/:id/edit", function(req, res) {
//     Movie.findById(req.params.id, function (err, foundMovie) {
//         if (err) {
//             res.redirect("/movies")
//         } else {
//             res.render("movies/edit", {movie: foundMovie}); 
//         }
//     });
//       //render form. pass in movie being edited
//     //res.send("<h1>Edit Route</h1>");
// });


// router.put("/:id", function (req, res) {
//     // find and update the right campgrond
//     Movie.findByIdAndUpdate(req.params.id, req.body.movie, function (err, updatedMovie) {
//         if (err) {
//             res.redirect("/movies");
//         } else {
//             res.redirect("/movies/" + req.params.id);   //if it work
//         }
//     }); 
//     //redirect to show page
// });
// //Update movie Route

// //middleware
// function isLoggedIn(req, res, next) { //check if loged in
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login"); //if not loged in go to login page
// }





// module.exports = router;  //export router from this file



//nice