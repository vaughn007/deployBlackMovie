var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Training Day",
    image: "https://www.gstatic.com/tv/thumb/v22vodart/28363/p28363_v_v8_ao.jpg",
    description: "On his first day on the job as a Los Angeles narcotics officer, a rookie cop goes beyond a full work day in training within the narcotics division of the L.A.P.D. with a rogue detective who isn't what he appears to be.",
    trailer: "https://dl.dropboxusercontent.com/s/52vxp02xdkvzqyi/Training%20Day%20%282001%29%20-%20IMDb.mp4?dl=1"
    }

]
 
// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]
 
function seedDB(){
   //Remove all movies
   Movie.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed movies!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //      //add a few movies
        //     data.forEach(function(seed){
        //         Movie.create(seed, function(err, movie){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("added a movie");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             movie.comments.push(comment);
        //                             movie.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    }); 
    //add a few comments
}
 
module.exports = seedDB;





/*var mongoose = require('mongoose');
var Movie = require("./models/movie");
var Comment = require("./models/comment");

var data = [
    
    {name: "River Lake", 
    image: "https://mynorth.com/wp-content/uploads/2017/03/LaVictor5_23_2015Wilderness_15-900x473.jpg",
    description: "This is a very pretty place bring your family down to check it out"
    },
    
    {name: "Detroit Lake", 
    image: "http://static-20.sinclairstoryline.com/resources/media/c2c0e17e-806c-4f8e-a16d-00b0023c019f-large16x9_story2.JPG",
    description: "Find and book perfect fishing holidays on camping, caravan and glamping sites in the UK, Ireland and Europe with Pitchup.com. Includes reviews, nearby attractions and events."
    },
    
    {name: "Porcupine Mountains", 
    image: "https://s17410.pcdn.co/wp-content/uploads/2012/10/porkies.jpg",
    description: "Hiking options by loops in the Porcupine Mountains State Wilderness Area in Michigan's Upper Peninsula is a great backpacking adventure."
    }
    
    
    ]

function seedDB() {
    //delet everything in database
Movie.remove({}, function(err) {
    if(err) {
        console.log(err);
    }
    console.log("Removed Campgronds");
    
    //add a few campgronds
data.forEach(function (seed) {
    Movie.create(seed, function(err, movie) {
        if (err) {
            console.log(err);
            
        } else {
           console.log("Added a Movie");
           //add a few comments
           Comment.create(
               {
                   text: "This place is great but it need some naked bitches",
                   author: "Jack"
               }, function (err, comment) {
                   if (err) {
                       console.log(err)
                   } else {
                       movie.comment.push(comment); //push on new comment
                       movie.save();
                   }
                   
               });
        }
    })
}); //end of loop movies data.forEach



});







}

module.exports = seedDB; //this will send out function. it will be stored in var seedsDB =require("./seeds");

*/













