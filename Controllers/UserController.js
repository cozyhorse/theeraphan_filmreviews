const { express } = require("../Config/config");
const { User } = require("../Models/UserSchema");
const { hashPassword } = require("../Services/bcrypt");
const { VerifyCredentials } = require("../Util/loginVerify");

const user = express.Router();

user.use(express.json());


user.post("/login", async (req, res) => {
    //Login and recieve token
try {
        const {email, password} = req.body;
        const user = await VerifyCredentials(email, password);
        console.log("user", user.username)
        res.status(200).json({msg: "login ok! :)"});

      
} catch (error) {
    return res.status(400).json({msg: error.message})
}    
    
})

.post("/signup", async (req, res) => {
    //add user
    try {
        const {password} = await req.body;
        const newUser = new User({
            ...req.body,
            password: await hashPassword(password),    
        });
        await newUser.save();
        res.status(200).json({msg: "user added!", info: newUser});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})


module.exports = { user };
