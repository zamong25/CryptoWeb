const dotenv = require('dotenv');
dotenv.config();
const request = require('request');
const uuidv4 = require("uuid/v4");
const sign = require('jsonwebtoken').sign;
const express = require('express');

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
const server_url = 'https://api.upbit.com'

// 1. set port 
const app = express();
app.set('port', process.env.PORT || 3000);

// 2. get data from upbit
const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}

const token = sign(payload, secret_key)

const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {Authorization: `Bearer ${token}`},
}
// until here

const result = {};

// 3. send to localhost and show data
app.get('/', (req, res, next) => {
    
    request.get(options, (error, response, body) => { // body is the data result
            
        if (error) throw new Error(error);
       
        const jsonData = JSON.parse(body);
        
        for (i = 0; i < jsonData.length; i++) {
            result[i] = jsonData[i].currency;
        }

        res.json(result);
    });
});

// 4. if the server make successfully, execute those functions
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});