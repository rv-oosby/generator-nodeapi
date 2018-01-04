const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const examples = require('./components/examples/route');

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send('healthy');
});

app.use('/examples', checkJwt, jwtAuthz(['write:examples']), examples);


// Error middleware should be last
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('error')
})

module.exports = app;