const express = require('express');
// const fetch = require('node-fetch');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config(); // Load env variables

const app = express();
const upload = multer();
app.use(cors());

const SHEET_DB_API_ENDPOINT = process.env.SHEET_DB_API_ENDPOINT;

// POST route for form submission
app.post('/submitform', upload.none(), async (req, res) => {
    const formData = req.body;

    try {
        const response = await fetch(SHEET_DB_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ data: formData }),
        });

        const result = await response.json();
        res.json({ status: 'success', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 'error', error: 'Submission failed' });
    }
});

app.get('/', (req, res)=>{
    res.status(200).send("GoogleSheets")

})
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
