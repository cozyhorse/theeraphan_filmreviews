const { express } = require("../Config/config");
const { User } = require("../Models/UserSchema");

const user = express.Router();

user.use(express.json());


user.post("/login", (req, res) => {
    //Login and recieve token
})

.post("/signup", async (req, res) => {
    //add user
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({msg: "user added!", info: newUser});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})


module.exports = { user };
