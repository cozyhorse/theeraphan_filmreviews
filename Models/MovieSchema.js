const { mongoose } = require("../Config/config");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: false,
    },
    genre: [{
        type: String,
        required: false
    }]
}); 

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
