const express = require("express");

require("dotenv").config();
const compression = require("compression");

const passport = require("passport");
const logger = require("morgan");
const cors = require("cors");

const path = require("path");

const api = require("./routes");

const app = express();

// set cors origin
app.use(
  cors({
    // origin: process.env.DASHBOARD_URL,
    origin: "*",
  })
);
app.use(express.json());
app.use(compression());

app.use(express.urlencoded());

app.use(logger("dev"));

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", api);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder for client
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "public")));

// set port
const port = process.env.API_PORT || 9090;
app.listen(port, () =>
  console.log(`Server running on port ~🚀~ http://localhost:${port}`)
);
