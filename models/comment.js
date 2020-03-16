var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);


// var mongoose = require("mongoose");

// var commentSchema = mongoose.Schema({
//     text: String,
//     author: String
// });

// module.exports = mongoose.model("Comment", commentSchema);


// var mongoose = require("mongoose");

// var commentSchema = mongoose.Schema({
//     text: String,
//     author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     }
// });

// module.exports = mongoose.model("Comment", commentSchema);




// var mongoose = require("mongoose");
 
// var commentSchema = new mongoose.Schema({
//     text: String,
//     author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User" //ref is the model we will refer to
//         },
//         username: String
//     }
// });


 
// module.exports = mongoose.model("Comment", commentSchema);