// + APP DEPENDENCIES
const express = require("express");
const config = require("config")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const fileUpload = require('express-fileupload');
const path = require("path");
const cors = require('cors');
// - APP DEPENDENCIES 
// + APP REQUIRES
const usersRootes = require("./routes/user.routes");
const authRootes = require("./routes/auth.routes");
const productsRootes = require('./routes/product.routes');
const cateogriesRootes = require('./routes/cateogry.routes');
const { options } = require("./routes/user.routes");
// - APP REQUIRES


// + MUTED CONFIGS
const app = express();
const appConfig = config.get("app");
const mongoConfig = config.get("mongo");
const port = appConfig.port || process.env.PORT
// - MUTED CONFIGS

// + DEPENDENCIES CONFIGS
app.use(cors({ credentials: true }));
app.options(appConfig.url, cors())
app.use(express.static(__dirname));
app.use('/', express.static(path.resolve(__dirname, appConfig.clientPath)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(fileUpload({ createParentPath: true }))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", appConfig.url);
  next();
});

// - DEPENDENCIES CONFIGS

// + DATA BASE CONNCTION
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

mongoose.connect(mongoConfig.uri, mongoConfig.options)
  .then((connection) => {
    console.log("Successfully connected to the main database");

  })
  .catch((err) => {
    console.log("Could not connect to the Local database ! ", err);
  });

// - DATA BASE CONNCTION

// + APP MAIN ROUTES

app.get("/api", (req, res) => {
  res.json({
    message: "API endpoints are  ready yet.",
  });
});

app.use('/api/auth', authRootes);
app.use('/api/products', productsRootes);
app.use('/api/users', passport.authenticate('access', { session: false }), usersRootes);
app.use('/api/categories', passport.authenticate('access', { session: false }), cateogriesRootes);
// - APP MAIN ROUTES
require("./utils/passport")(passport);
app.listen(port, () => { console.log("Server is listening on port " + port); });


/*
// + TEST FIREBSE
app.post("api/upload", (req, res) => {

  let file = (req.files) ? req.files.file : null;
  if (file)
    firebaseStorage.upload(file, "testupload.jpg").then(
      result => {
        return res.json({ message: 'uploaded', data: result });
      }
    ).catch(err => {
      return res.json({ message: 'error', data: err + "" });
    }
    );
  else return res.json({ message: "request error", message: "no files provided" })
});

// - TEST FIREBSE

// + TEST FIREBSE
app.post("/api/upload", (req, res) => {
  let file = (req.files) ? req.files.file : null;
  if (file) {
    console.log("req : ", req.files["file"]);
    res.json({ data: file, message: "OK" })
    cloudinary.uploader.upload_stream({
      overwrite: false,
      folder: 'test-uploads'
    }, (error, result) => {
      if (error)
        res.status(200).json({ message: "failed uplaod file", data: error })
      else
        res.status(200).json({ message: "file uploaded succefully!", data: result })
    }).end(file.data)
  }
  else return res.json({ message: "request error", message: "no files provided" })
});
*/