const { mongoose } = require("../Config/config");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(?=.*[A-Z])(?=.*\\d).{8,}$/
    },
    password: {
        type: String,
        required: true
    }
}) 


const User = mongoose.model("User", userSchema);

module.exports = { User };