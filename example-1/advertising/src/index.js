const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const csvtojson = require('csvtojson');
//
// Setup event handlers.
//
function setupHandlers(app) {

    // Read the CSV file and convert it to a JSON object
    // const csv = fs.readFileSync("ads.csv")
    
    app.get("/advertisement", (req, res) => {
        // var num = Math.floor(Math.random() * Object.keys(dict).length)
        // let data = advertisement[num]
        // res.json({ data });


        // csvtojson().fromFile("ads.csv").then((data) => {
        // // Select a random item from the JSON object
        // const randomIndex = Math.floor(Math.random() * data.length);
        // const randomItem = data[randomIndex];
        let data = {
            "name": "Agoda",
            "url": "www.agoda.com"
        }
        res.json({ data })
        // }).catch((err) => {
        //     console.error(err);
        // });
    });
}

//
// Start the HTTP server.
//
function startHttpServer() {
    return new Promise(resolve => { // Wrap in a promise so we can be notified when the server has started.
        const app = express();
        app.use(bodyParser.json()); // Enable JSON body for HTTP requests.
        setupHandlers(app);

        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            resolve(); // HTTP server is listening, resolve the promise.
        });
    });
}

//
// Application entry point.
//
function main() {
    return startHttpServer()
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });