require('dotenv').config();
const express = require('express');
 session = require('express-session');
 axios = require('axios');
 massive = require('massive');


 const app = express();


 const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, CONNECTION_STRING } = process.env;

 massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
 });

 app.use(session ({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


// redrirect url in login.js component;
app.get('/auth/callback', async (req, res) => {
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
let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.access_token}`);

  // db calls;
  // put user-data on req.session object;
  // req.session.user = resoonseFromDB;
  // req.session = { user: {} };
  const db = req.app.get('db');
  let { sub, email, name, picture } = resWithUserData;
  let foundUser = await db.find_user([sub])

// req.session.user is anyone logged in - if no one is then it will return an empty array;
  if (foundUser[0]) {
    req.session.user = foundUser[0];
    // this path ('/') simply means ==> res.redirect('http://localhost:3000/');
    res.redirect('/')
  } else {
    // create user
    let createdUser = await db.create_user([name, email, sub, picture])
    // put on session
    req.session.user = createdUser[0];
  }
});

 app.listen(SERVER_PORT, () => {
   console.log(`Listening on port: ${SERVER_PORT}`);
 });
