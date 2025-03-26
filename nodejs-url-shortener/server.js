const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => {
    console.log("connected to database")
})

const UrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String
});

const PORT = process.env.PORT
const Url = mongoose.model("Url", UrlSchema);

app.post("/shorten", async(req, res) => {
    const { originalUrl } = req.body;
    const existing = await Url.findOne({originalUrl});

    if(existing) return res.json(existing);

    const shortUrl = shortid.generate();
    const newUrl = new Url({originalUrl, shortUrl})
    await newUrl.save();
    res.json(newUrl);
});

app.get("/", (req, res) => {
    res.send("URL Shortener")
})

app.get("/:shortUrl", async (req, res) => {
    const {shortUrl} = req.params;
    const urlEntry = await Url.findOne({shortUrl});
    if (urlEntry) {
        let targetUrl = urlEntry.originalUrl.startsWith("http") 
            ? urlEntry.originalUrl 
            : `https://${urlEntry.originalUrl}`;
        // return res.redirect(targetUrl);
        return res.json({shortenedUrl: targetUrl})
    }
    res.status(404).json({error: "URL not found"});
});

app.listen(PORT, () => {
    console.log(`URL Server is running on http://localhost:${PORT}`)
})