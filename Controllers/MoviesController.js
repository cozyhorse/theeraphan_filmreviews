const { express, mongoose } = require("../Config/config");
const { Movie } = require("../Models/MovieSchema");

const movie = express.Router();

movie.use(express.json());

movie
  .get("/movies", async (req, res) => {
   try {
        const movies = await Movie.find({})
        res.status(200).json(movies)
   } catch (error) {
        return res.status(404).json({msg: "no movies in library"})
   }
    
  })

  .post("/movies", async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(200).json({msg: "movie added!"});
    } catch (error) {
        return res.status(404).json({msg: error.message});
    }
  })

  .get("/movies/:id", async (req, res) => {
    //get one specific movies
    try {
        const movie = await Movie.findById(new mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(movie)
    } catch (error) {
        return res.status(404).json({ msg: error.message});
    }
  })

  .put("/movies/:id", async (req, res) => {
    //update/change one specific movie
  })

  .get("/movies/:id/reviews", async (req, res) => {
    //get all reviews for a specific movie
  })

  .delete("/movies/:id", async (req, res) => {
    //delete a specific movie
  });

module.exports = { movie };
