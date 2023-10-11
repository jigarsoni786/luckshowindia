const mongoose = require("mongoose"
// , {

//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
);

const lottrySchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    date: Date,
    lottryNumber: String,
    massage: String,    
    quiz: String,
    })

module.exports= mongoose.model("lottrys", lottrySchema);
