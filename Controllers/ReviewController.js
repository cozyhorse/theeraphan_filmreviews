const { express } = require("../Config/config");
const { Review } = require("../Models/ReviewSchema");

const review = express.Router();

review.use(express.json());

review.get("/reviews", async (req, res) => {
    //get all reviews?
})

.post("/reviews", async (req, res) => {
    //add review
    const review = new Review(req.body)
    await review.save()
    res.status(200).json({msg: "review added.", info: review})
})

.get("/reviews/:id", async (req, res) => {
    //get one specific reviews
})

.put("/reviews/:id", async (req, res) => {
    //update/change one specific review
})

.delete("/reviews/:id", async (req, res) => {
    //delete a specific review
})


module.exports = {review};