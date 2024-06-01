const { express } = require("../Config/config");
const { Review } = require("../Models/ReviewSchema");
const { verifyToken } = require("../Services/jwt");

const review = express.Router();

review.use(express.json());
review.use(verifyToken)

review
  .get("/reviews", async (req, res) => {
    //get all reviews?
    try {
      const reviews = await Review.find({});
      res.status(200).json(reviews);
    } catch (error) {
      return re.status(500).json(error.message);
    }
  })

  .post("/reviews", async (req, res) => {
    //add review
    try {
      const user = await req.user;
      const review = new Review({
        userId: user._id,
        ...req.body,
      });
      await review.save();
      res.status(200).json({ msg: "review added.", info: review });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  })

  .get("/reviews/:id", async (req, res) => {
    //get one specific reviews
    const review = await Review.findById({ _id: req.params.id }).populate("movieId");
    if (!review) {
      return res.status(403).json({ msg: "ID doesn't exists" });
    }
    res.status(200).json(review);
  })

  .put("/reviews/:id", async (req, res) => {
    //update/change one specific review
    const user = await req.user;
    const review = await Review.findById({ _id: req.params.id });

    try {
      if (!review) {
        return res.status(403).json({ msg: "review doesn't exists" });
      }
      console.log("user", user._id);
      console.log("review", review.userId.toString());

      if (review.userId.toString() !== user._id) {
        return res.status(403).json({ msg: "user doesn't own the review" });
      }

      const editedReview = await Review.findByIdAndUpdate(
        req.params.id,
        {
          comment: req.body.comment,
          modifiedAt: Date.now(),
        },
        {
          new: true,
        }
      );

      console.log("editedReview", editedReview);
      await editedReview.save();

      res.status(200).json({ msg: "comment updated!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  })

  .delete("/reviews/:id", async (req, res) => {
    //delete a specific review
    try {
      const user = await req.user;
      const item = await Review.findById({ _id: req.params.id });
      const review = await Review.findByIdAndDelete({ _id: req.params.id });
      if (!review) {
          return res.status(403).json({ msg: "review not found!" });
        }
        if (item.userId.toString() !== user._id) {
          return res.status(403).json({ msg: "user doesn't own the review" });
        }
      res.status(200).json({ msg: "review deleted!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });


module.exports = {review};