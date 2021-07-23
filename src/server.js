const express = require("express");
var compression = require("compression");
var helmet = require("helmet");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const logger = require("./core/logger");
const { dbConnectionString } = require("./configs/server-config.js");
var mongoDBString = process.env.MONGODB_URI || dbConnectionString;

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// Few Routes
var indexRouter = require("./routes/index");
var mediaRouter = require("./routes/media");

// GrahpQL
const graphqlSchema = require("./schemas/index");

// DB
const db = mongoose.connection;

const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

// Use Gzip for Compressed Responses
app.use(compression()); //Compress all routes

// Using Helmet to protect against known vulnerabilites
app.use(helmet());

// CORS
app.use(cors());

// DB Connection Success
// app.listen(PORT, HOST, async () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
//   await mongoose.connect(dbConnectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// Connect DB
mongoose.connect(mongoDBString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DB Connection Error
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// DB Connection Success
db.on("success", console.log.bind(console, "MongoDB connected successfully!"));

app.listen(PORT, async () => {
  // await mongoose.connect(mongoDBString, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  console.log(`Running on ${PORT}`);
});

// GraphQL Test Call
app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
    };
  })
);

// Files Management API
app.use("/media", mediaRouter);

// app.use("/upload", (req, res) => {
//   res.send(`Upload Service Running`);
// });

// Default
app.use("/", indexRouter);

// app.use("/", (req, res) => {
//   res.send(`API is ready`);
// });
