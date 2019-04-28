import React, { Component } from 'react';
import './App.css';

import * as d3 from "d3";
import {rooturl} from './config/settings';
import axios from 'axios';


class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }
      
    drawChart() {

        var data = [];

        axios.get('http://'+rooturl+':3001/api/graph')
        .then(response => {
   
         console.log(response.data);
   
                 data = response.data;
                 console.log("inside bar chart");
                 console.log(data);
                 var svgWidth = 1800, svgHeight = 400;
                 var margin = { top: 30, right: 20, bottom: 30, left: 150 };
                 var width = svgWidth - margin.left - margin.right;
                 var height = svgHeight - margin.top - margin.bottom;
                 
                 const svg = d3.select("body").append("svg")
             .attr("width", width)
             .attr("height", this.props.height);
           
           // var svg = d3.select('svg')
           // .attr("width", svgWidth)
           // .attr("height", svgHeight);
           
           var g = svg.append("g")
              .attr("transform", 
                 "translate(" + margin.left + "," + margin.top + ")"
              );
           
              var x = d3.scaleTime().rangeRound([0, width]);
           var y = d3.scaleLinear().rangeRound([height, 0]);
           
           var line = d3.line()
              .x(function(d) { return x(d.date)})
              .y(function(d) { return y(d.value)})
              x.domain(d3.extent(data, function(d) { return parseInt(d.date) }));
              y.domain(d3.extent(data, function(d) { return parseInt(d.value) }));
           
              g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
              .select(".domain")
              .remove();
           
           
              g.append("g")
              .call(d3.axisLeft(y))
              .append("text")
              .attr("fill", "#0000")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "1em")
              .attr("text-anchor", "end")
              .text("GDP");
           
           
              g.append("path")
           .datum(data)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 1.5)
           .attr("d", line);
           
          });
     

     





    //   svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * 70)
    //     .attr("y", (d, i) => this.props.height - 10 * d)
    //     .attr("width", 65)
    //     .attr("height", (d, i) => d * 10)
    //     .attr("fill", "green")

 

    

    }
          
    render(){
      return <div id={"#" + this.props.id}></div>
    }
  }
      
  export default BarChart;