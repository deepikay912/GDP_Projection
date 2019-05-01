const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const fetch = require("node-fetch");
const getGraphData = require('./routes/dataGraph'); 

//session
app.use(session({
    secret: 'GDP',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  }));

app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(bodyParser.json())

app.use('/api/graph', getGraphData);

app.listen(3001,function(){console.log("Server listening on port 3001")})
