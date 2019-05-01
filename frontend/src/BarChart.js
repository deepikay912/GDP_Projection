import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import {rooturl} from './config/settings';
import axios from 'axios';


class BarChart extends Component {

    componentDidMount() {
      
      this.drawChart();
      this.addSymbols = this.addSymbols.bind(this);
    }


    //  adding suffixes for large numbers
    addSymbols(value){
      var suffixes = ["", "K", "M", "B","T"];
      var order = Math.max(Math.floor(Math.log(value) / Math.log(1000)), 0);
      if(order > suffixes.length - 1)
        order = suffixes.length - 1;
      var suffix = suffixes[order];
      

      return String(Math.round(value / Math.pow(1000, order) * 100) / 100+ suffix);
    }
      
    drawChart() {

        var data = [];

        axios.get('http://'+rooturl+':3001/api/graph')
        .then(response => {
   
          data = response.data;
          data.reverse();
          
          let svgWidth = 2200, svgHeight = 400;
          let margin = { top: 30, right: 10, bottom: 30, left: 70 };
          let width = svgWidth - margin.left - margin.right;
          let height = svgHeight - margin.top - margin.bottom;
          const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
          
          const svg = d3.select("body").append("svg")
           .attr("width", width+100)
           .attr("height", this.props.height);


              var g = svg.append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")"
            );
                var x = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.2);
              
              var y = d3.scaleLinear()
                .rangeRound([height, 0]);

                x.domain(data.map(function (d) {
                return d.date;
              }));

            

              y.domain([0, d3.max(data, function (d) {
                return d.value;
              })]);        



        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%5)})))
        

        g.append("g")
        .call(d3.axisLeft(y).tickFormat(
           (value) => {
             return this.addSymbols(value)
           }
        ))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("GDP");


        svg.append('text')
    .attr('x', -180)
    .attr('y', 30)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Annual GDP value in US -->')

        svg.append('text')
        .attr('x', 680)
        .attr('y', 420)
        .attr('text-anchor', 'middle')
        .text('By Year -->')

        

        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(String(d.date));
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(Number(d.value));
        })
        .style('fill', (d, i) => colorScale(i));



        svg.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', d => x(d.date) + x.bandwidth()/2+70 )
        .attr('dx', 0)
        .attr('y', d => y(d.value)+20)
        .attr('dy', 0)
        .text(d => this.addSymbols(d.value)
          
        );
                



   

      
  }, (error) => {
    console.log("Cannot fetch data")
  }).catch((error) => {
    console.log(`Error : ${error}`)
  });
}
          
    render(){
      return ( 
        
      <div ></div>
      )
    }
  }
      
  export default BarChart;