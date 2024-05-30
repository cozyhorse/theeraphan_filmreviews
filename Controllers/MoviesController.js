const { express } = require("../Config/config");

const movie = express.Router();

movie.use(express.json());

movie.get("/movies", async (req, res) => {
    //get all movies?
})

.post("/movies", async (req, res) => {
    //add movie
})

.get("/movies/:id", async (req, res) => {
    //get one specific movies
})

.put("/movies/:id", async (req, res) => {
    //update/change one specific movie
})

.get("/movies/:id/reviews", async (req, res) => {
    //get all reviews for a specific movie
})

.delete("/movies/:id", async (req, res) => {
    //delete a specific movie
})

module.exports = {movie}