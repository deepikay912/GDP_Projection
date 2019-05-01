const fetch = require("node-fetch");

const express = require('express');
const router = express.Router();

const url = "http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json";

// fetch data from data source and parse json data which can be used by frontend
const getData = async (url) => {
  try {

    const response = await fetch(url);
    let json = await response.json();

    let data = json[1];
    let result = [];

    for (let d in data) {
      result.push({value: parseInt(data[d].value), date: parseInt(data[d].date)});
     }
      return  Promise.resolve(result);
  } 
  catch (error) {
    Promise.reject(new Error('Unable to fetch data from data source'));
  }
};


// get api to fetch data
router.get('/',function (req, res) {

    getData(url).then(data => { 
      res.send(data);
      res.end();
     },(error) => {
      res.send('500', error.value)
     
  });
  });

  module.exports=router