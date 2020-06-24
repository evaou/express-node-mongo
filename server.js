const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://test:test1234@cluster0-znft6.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
        })
        .catch((error) => console.error(error));

      res.sendFile(__dirname + "/index.html");
    });
  })
  .catch((error) => console.error(error));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   //    res.send('Hello World')
//   res.sendFile(__dirname + "/index.html");
// });
