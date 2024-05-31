const { User } = require("../Models/UserSchema")
const { compareHash } = require("../Services/bcrypt")

const VerifyCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("no such user :(")
    }

    const CorrectPassword = await compareHash(password, user.password)
    if(!CorrectPassword) {
        throw new Error("Invalid password.")
    }

    console.log("credentials verified")
    return user;    
}

module.exports = { VerifyCredentials }