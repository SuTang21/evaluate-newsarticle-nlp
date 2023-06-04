const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));


const analysis = [];

// POST method route
app.post('/sentiment-analysis', async (req, res) => {
    const { text } = req.body;
    const apiKey = process.env.API_KEY;
    const url = `https://api.meaningcloud.com/sentiment-2.1`;

    const requestBody = new URLSearchParams({
        key: apiKey,
        txt: text,
        lang: 'en',
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
        redirect: 'follow'
    };      

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    res.send(data);
    analysis.push(data);
})

app.get('/all', getAnalysis);

function getAnalysis(req, res){
    res.send(analysis)
}



const port = 8080;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})

app.get('/', function (req, res) {
    console.log("I am in the root folder!");
    res.sendFile('dist/index.html');
})