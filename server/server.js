require('dotenv').config();
const express = require('express');
 session = require('express-session');


 const app = express();

 const { SERVER_PORT, REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env;

 app.listen(SERVER_PORT, () => {
   console.log(`Listening on port: ${SERVER_PORT}`);
 });