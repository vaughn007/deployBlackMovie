var mongoose = require("mongoose");

// var movieSchema = new mongoose.Schema({
//    title: String,
//     image: String,
//     stars: String, 
//     body: String,
//     trailer: String,
//    author: {
//       id: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User"
//       },
//       username: String
//    },
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });



// module.exports = mongoose.model("Movie", movieSchema);


var movieSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
	trailer: String,
	stars: String,
	year: String,
	director: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});



module.exports = mongoose.model("Movie", movieSchema);









// var mongoose = require("mongoose");
 
// var movieSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String,
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });
 
// module.exports = mongoose.model("Movie", movieSchema);




/*var mongoose = require('mongoose');

//schem set up
var movieSchema = new mongoose.Schema({
    name: "String",
    image: "String",
    description: "String"
});

module.exports = mongoose.model("Movie", movieSchema); //we will get this model when rquire is used */