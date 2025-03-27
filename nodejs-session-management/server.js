const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./db");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

app.get("/", (req, res) => {
  res.send("Session Management in Node.js");
});

// Login route
app.post("/login", (req, res) => {
  const { username } = req.body;
  req.session.user = { username };
  res.send(`User ${username} logged in.`);
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.send("Logged out successfully");
  });
});

// Protected route
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.status(401).send("Unauthorized");
  res.send(`Welcome ${req.session.user.username}`);
});

app.listen(PORT, () =>
  console.log(`Session Server running on http://localhost:${PORT}`)
);
