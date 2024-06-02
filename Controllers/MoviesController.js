const { express, mongoose } = require("../Config/config");
const { Movie } = require("../Models/MovieSchema");
const { Review } = require("../Models/ReviewSchema");
const { verifyToken } = require("../Services/jwt");

const movie = express.Router();

movie.use(express.json());
//verify token
movie.use(verifyToken);

movie
  .get("/movies", async (req, res) => {
    //get all movies
    try {
      const movies = await Movie.find({});
      res.status(200).json(movies);
    } catch (error) {
      return res.status(404).json({ msg: "no movies in library" });
    }
  })

  .get("/movies/ratings", async (req, res) => {
    //get all movies with ratings
      try {
        
        const result = await Movie.aggregate([
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "movieId",
              as: "reviews"
            }
          },
          {
            $unwind: {
              path: "$reviews",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: "$_id",
              title: {$first: "$title"},
              rating: {$avg: "$reviews.rating"}
            }
          },
          {
            $project: {
              _id: 0,
              movieId: "$_id",
              title: 1,
              rating: 1
            }
          }
        ])
        //console.log("aggregate", result) 
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
  })

  .post("/movies", async (req, res) => {
    //add movie
    const role = req.user._role;
    //console.log("role", role);
    if (role === "user") {
      return res
        .status(404)
        .json({ msg: "Unauthorized to add movie, no permission " });
    }
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(200).json({ msg: "movie added!", info: movie });
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  })

  .get("/movies/:id", async (req, res) => {
    //get one specific movies
    try {
      const movie = await Movie.findById({ _id: req.params.id });
      res.status(200).json(movie);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  })

  .put("/movies/:id", async (req, res) => {
    //update/change one specific movie
    const role = req.user;
    if (role === "user") {
      return res
        .status(404)
        .json({ msg: "Unauthorized to make changes, no permission " });
    }
    try {
      const movie = await Movie.findByIdAndUpdate(
        { _id: req.params.id },
        { title: req.body.title }
      );
      await movie.save();
      res.status(200).json({ msg: "updated!" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  })

  .get("/movies/:id/reviews", async (req, res) => {
    //get all reviews for a specific movie
    try {
      const reviews = await Review.find({ movieId: req.params.id });
      res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  })

  .delete("/movies/:id", async (req, res) => {
    //delete a specific movie
    try {
      const movie = await Movie.findByIdAndDelete({ _id: req.params.id });
      if (!movie) {
        return res.status(404).json({ msg: "movie not found!" });
      }
      res.status(200).json({ msg: "movie deleted!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });

module.exports = { movie };
