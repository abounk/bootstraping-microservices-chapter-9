const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");

//
// Connect to the database.
//
function connectDb() {
    return mongodb.MongoClient.connect(DBHOST) 
        .then(client => {
            return client.db(DBNAME);
        });
}


//
// Setup event handlers.
//
function setupHandlers(app, db) {

    const advertisementsCollection = db.collection("advertisements");

    //
    // HTTP GET API to retrieve video viewing history.
    //
    app.get("/advertisement", (req, res) => {
        advertisementsCollection.aggregate({ $sample: { size: 1 } })
            .toArray()
            .then(advertisement => {
                res.json({ advertisement });
            })
            .catch(err => {
                console.error("Failed to get advertisements collection.");
                console.error(err);
                res.sendStatus(500);
            });
    });
}

//
// Start the HTTP server.
//
function startHttpServer(db) {
    return new Promise(resolve => { // Wrap in a promise so we can be notified when the server has started.
        const app = express();
        app.use(bodyParser.json()); // Enable JSON body for HTTP requests.
        setupHandlers(app, db);

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
    return connectDb()                                          // Connect to the database...
        .then(db => {                                           // then...
            return startHttpServer(db); // start the HTTP server.
        });
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });