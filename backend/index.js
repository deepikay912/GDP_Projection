var express = require('express')
var app = express()
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//Passport Authentication
var passport = require('passport');


app.use(session({
    secret: 'cmpe-273-quora-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  }));

app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(bodyParser.json())



app.get('/api/graph', function (req, response) {

var options = {
    host: 'api.worldbank.org',
    path: '/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json'
  }

var request = http.request(options, function (res) {

      var data = '';
      console.log('in http request');
        console.log(res);
            
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(data);

        response.json({
          data1: data
          });
      
      response.end();

    });
  });


request.on('error', function (e) {
    console.log(e.message);
});
request.end();
 

});

async function getData1() {
  const response = await fetch('http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json');
  const json = await response.json();
  
  console.log(json[0]);
}

const getData = new Promise((resolve, reject) => {
  const res = fetch('http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json');
  const json =  res.json();
  console.log(json[0]);
  resolve(json);
});

app.get('/',function(req,res) {
getData.then((response)=> {
  res.end(response);
})
})





app.listen(3001,function(){console.log("Server listening on port 3001")})