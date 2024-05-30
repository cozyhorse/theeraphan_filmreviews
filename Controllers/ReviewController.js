const { express } = require("../Config/config");

const review = express.Router();

review.use(express.json());

review.get("/reviews", async (req, res) => {
    //get all reviews?
})

.post("/reviews", async (req, res) => {
    //add review
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