const { dev_port, mongoose, dev_uri, clientOptions, dev_url, express } = require("./Config/config");
const { movie } = require("./Controllers/MoviesController");
const { review } = require("./Controllers/ReviewController");
const { user } = require("./Controllers/UserController");

console.log(dev_port)
console.log(dev_url)
const server = express();

server.use("/api", user)
server.use("/api", review)
server.use("/api", movie)

const startServer = async () => {
  try {
    await mongoose.connect(dev_uri, clientOptions)
    console.log("Connected to MongoDb");

    server.listen(dev_port, () => {
        console.log(`Server running on https://${dev_url}:${dev_port}`)
    });
  } catch (error) {
    console.log("Failed to connect to MongoDb")
    console.error(error);
  }
};

startServer();
