const jwt = require("jsonwebtoken");
const { dev_secret } = require("../Config/config");

const verifyToken = async (req, res, next) => {
  //Remove "Bearer"
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  console.log("secret", dev_secret);
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized" });

  try {
    const verifiedToken = await jwt.verify(token, dev_secret);
    req.user = verifiedToken
    console.log("verifiedToken", verifiedToken); 
    next();
} catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token!" });
  }
};

module.exports = { verifyToken };
