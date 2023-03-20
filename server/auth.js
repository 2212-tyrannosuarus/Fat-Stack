const express = require("express");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: "https://www.capstone-api.com",
  issuerBaseURL: "https://2212capstone.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(port);

console.log("Running on port ", port);
