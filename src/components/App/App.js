import React, {Component} from 'react'
import Adding from '../Adding/Adding'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import subscribers from './subscribers'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">ELARAY</h1>
          <h6 className="social-network">Social Network</h6>
        </div>
        <Adding subscribers={subscribers}/>
      </div>
    )
  }
}



export default App
