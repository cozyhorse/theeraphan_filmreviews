const { express } = require("../Config/config");

const user = express.Router();

user.use(express.json());


user.post("/login", (req, res) => {
    //Login and recieve token
})

.post("/signup", (req, res) => {
    //add user
})


module.exports = { user };
