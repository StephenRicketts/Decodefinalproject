let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let multer = require("multer");

let upload = multer({
  dest: __dirname + "/uploads/"
});
let sessions = {};
let cookieParser = require("cookie-parser");
app.use(cookieParser());

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-ylap0.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    console.log("this is an error", err);
    dbo = db.db("TRDB");
  }
);

// Your endpoints go after this line

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

app.post("/tenantsignup", upload.single("img"), (req, res) => {
  console.log("tenantsignup server hit");
  console.log("this is the body", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  let file = req.file;
  let email = req.body.email;
  let imgPath = "/uploads/" + file.filename;
  console.log("backend image", imgPath);
  dbo.collection("tenants").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user !== null) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user === null) {
        dbo.collection("tenants").insertOne(
          {
            username: name,
            password: pwd,
            email: email,
            image: imgPath
          },
          (error, insertedTenant) => {
            if (error) {
              console.log("error inserting tenant:", error);
              res.send(
                JSON.stringify({
                  success: false
                })
              );
              return;
            }
            let sessionId = generateId();
            sessions[sessionId] = name;
            res.cookie("sid", sessionId);
            res.send(
              JSON.stringify({
                success: true
              })
            );
            return;
          }
        );
      }
    }
  );
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
