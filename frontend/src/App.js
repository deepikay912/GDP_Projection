
import React, { Component } from 'react';
import './App.css';

import BarChart from './BarChart';
import {rooturl} from './config/settings';
import axios from 'axios';

//App Component
// class App extends Component {
//   render() {
//     return (
//       //Use Browser Router to route to different pages
//       <BrowserRouter>
//         <div>
//           {/* App Component Has a Child Component called Main*/}
//           <Main/>
//         </div>
//       </BrowserRouter>
//     );
//   }
// }
//Export the App component so that it can be used in index.js



class App extends Component {
  
  state = {
    data: [],
    width: 700,
    height: 500,
    id : 100
  }

  componentDidMount() {
  
    axios.get('http://'+rooturl+':3001/api/graph')
     .then(response => {

      console.log(response.data);

              this.setState({
                  data : this.state.data.concat(response.data)
              
                 });
       });
       
  }

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}
export default App;