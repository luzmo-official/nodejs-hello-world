const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config()

const data = JSON.stringify({
  "action": "create",
  "version": "0.1.0",
  "key": process.env.CUMUL_KEY,
  "token": process.env.CUMUL_TOKEN,
  "properties": {
    "integration_id": process.env.INTEGRATION_ID,
    "type": "sso",
    "expiry": "24 hours",
    "inactivity_interval": "1 year",
    "username": "user_1",
    "name": process.env.USER_NAME,
    "email": process.env.USER_EMAIL,
    "suborganization": "user_1",
    "role": "viewer"
  }
});

var config = {
  method: 'post',
  url: 'https://api.cumul.io/0.1.0/authorization',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};



const app = express();
const port = 3000;

app.get('/', (req, res) => {
  axios(config)
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    res.json(error);
  });
});

app.listen(port, () => {
  console.log(`CUMUL Server app listening on port ${port}`)
});
