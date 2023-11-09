const express = require('express');
const { MongoClient } = require('mongodb');
const router = require('./routes/routes');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const app = express();

async function start() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to",mongoURI);

    // Add your database-related code here if needed

    app.listen(port, () => {
      console.log(`Listening for connections on port ${port}`);
    });
  } finally {
    // Ensure the client closes when you're finished with it
    // await client.close();
  }
}

start();

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy());
app.use(session({
  secret: 'emotime666',
  resave: false,
  saveUninitialized: true,
}));
app.use(fileUpload({ createParentPath: true }));
app.use(router);