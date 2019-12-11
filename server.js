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
    if (err) {
      console.log("this is an error", err);
    }
    dbo = db.db("TRDB");
  }
);

// Your endpoints go after this line

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

app.post("/getMatchedProfile", upload.none(), (req, res) => {
  console.log("get matched profile server hit");
  let matchedUserName = req.body.matchedProfile;
  dbo
    .collection("roommateProfiles")
    .findOne({ username: matchedUserName }, (err, profile) => {
      if (err) {
        console.log("error finding profile");
        return;
      }
      res.send(JSON.stringify(profile));
    });
});

app.post("/getProfile", upload.none(), (req, res) => {
  console.log("get profile server hit");
  console.log("this is the body", req.body);
  let username = req.body.username;
  dbo
    .collection("roommateProfiles")
    .findOne({ username: username }, (err, profile) => {
      if (err) {
        console.log("error finding profile");
        return;
      }
      res.send(JSON.stringify(profile));
    });
});

app.post("/matches", upload.none(), (req, res) => {
  console.log("matches server hit");
  console.log("this is the body", req.body);
  let from = req.body.from;
  let to = req.body.to;
  dbo
    .collection("matches")
    .findOne({ requester: to, requested: from }, (err, match) => {
      if (err) {
        console.log("error during match find");
        res.send(
          JSON.stringify({
            status: "failed"
          })
        );
        return;
      }
      if (match !== null) {
        console.log("this is a match");
        //do something to delete request
        let generateMatchId = () => {
          return "" + Math.floor(Math.random() * 100000000);
        };
        let matchId = generateMatchId();

        dbo
          .collection("roommateProfiles")
          .updateOne(
            { username: from },
            { $push: { matches: { candidate: to, matchId: matchId } } }
          );
        dbo
          .collection("roommateProfiles")
          .updateOne(
            { username: to },
            { $push: { matches: { candidate: from, matchId: matchId } } }
          );
        dbo.collection("matches");
        res.send(
          JSON.stringify({
            status: "matched"
          })
        );
        return;
      }
      if (match === null) {
        console.log("inserting match");
        dbo.collection("matches").insertOne({ requester: from, requested: to });
        res.send(
          JSON.stringify({
            status: "Match-inserted"
          })
        );
        return;
      }
      res.json({ status: "failed" });
    });
});

app.get("/allprofiles", (req, res) => {
  console.log("all profiles server hit");
  dbo
    .collection("roommateProfiles")
    .find({})
    .toArray((err, products) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }

      products = products.slice().reverse();
      res.send(JSON.stringify(products));
    });
});

app.post("/roommateSignup", upload.single("img"), (req, res) => {
  console.log("roommate signup server hit");
  console.log("this is the body", req.body);
  console.log("preferences", req.body.preferences);
  let username = req.body.username;
  let pwd = req.body.password;
  let firstName = req.body.name;
  let age = req.body.age;
  let profession = req.body.profession;
  let priceRange = req.body.priceRange;
  let gender = req.body.gender;
  let pets = req.body.pets;
  let astroSign = req.body.astroSign;
  let preferences = req.body.preferences;
  let file = req.file;
  let email = req.body.email;
  let imgPath = "/uploads/" + file.filename;
  let location = req.body.location;
  console.log("backend image", imgPath);
  dbo.collection("roommateProfiles").findOne(
    {
      username: username
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
        dbo.collection("roommateProfiles").insertOne(
          {
            username: username,
            password: pwd,
            email: email,
            image: imgPath,
            firstName: firstName,
            age: age,
            profession: profession,
            priceRange: priceRange,
            gender: gender,
            pets: pets,
            astroSign: astroSign,
            preferences: preferences,
            location: location
          },
          (error, insertedRoommateProfile) => {
            if (error) {
              console.log("error inserting landlord:", error);
              res.send(
                JSON.stringify({
                  success: false
                })
              );
              return;
            }
            let sessionId = generateId();
            sessions[sessionId] = username;
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

app.post("/login", upload.none(), (req, res) => {
  console.log("login server hit");
  console.log("this is the username", req.body.username);
  let name = req.body.username;
  console.log("this is the password", req.body.password);
  let password = req.body.password;
  dbo.collection("roommateProfiles").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
        console.log("this is an error");
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user === null) {
        console.log("user equals null");
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user.password === password) {
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
      res.send(
        JSON.stringify({
          success: false
        })
      );
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
