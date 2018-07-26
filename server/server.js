require('dotenv').config();
const express = require('express');
 session = require('express-session');
 axios = require('axios');


 const app = express();

 const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env;

// redrirect url in login.js component;
app.get('/auth/callback', (req, res) => {
  // req.query.code =====> code from auth0 to our endpoint in the front end;
  // http://localhost:3005/auth/callback?code=hfj34834673yh
  // now our payload object;
  // req.query = { code: hfj34834673yh }
  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.header.host}/auth/callback`
  };

  // use the code from auth0 to get a token
  // we are sending the payload object and the url - since we're sedning its a post;
let resWithToken = axios.post(`https://${REACT_APP_DOMAIN}/auth/token`, payload);

// use the access tokenc to get user info for whoever logged in;
let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token={resWithToken.access_token}`)

})

 app.listen(SERVER_PORT, () => {
   console.log(`Listening on port: ${SERVER_PORT}`);
 });