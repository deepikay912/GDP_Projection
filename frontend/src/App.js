
import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart';


class App extends Component {
  
  state = {
    width: 700,
    height: 500,
   }

  render() {
    return (
      <div>
      <div className="App">
      <h3 align="center"> United States GDP Annual Growth Rate</h3>
        <BarChart class= "barchart" width={this.state.width} height={this.state.height} />

     
      </div>
</div>
    );
  }
}
export default App;