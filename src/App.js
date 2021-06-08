import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home  from './homepage/Home';
import Upload from './components/Upload/Upload.js';
import './App.css';
import { ResponsiveEmbed } from 'react-bootstrap';

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        greeting: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ name: event.target.value });
    }
    
    componentDidMount() {
      console.log('componentDidMount() has been executed in App.js!')

      console.log("Quering database for blog posts!")
      fetch(`/api/databaseList`)
      .then(response => response.json())
      .then(data =>{
        console.log(data)
      })
    }

    handleSubmit(event) {
      event.preventDefault();
      fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
        .then(response => response.json())
        .then(state => this.setState(state));
    }
    render() {
      return (
        <Router>
          <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" >Brand</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><Link to="/upload">Upload a file! <span className="sr-only">(current)</span></Link></li>
                <li><Link >Link</Link></li>
                <li className="dropdown">
                  <Link  className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></Link>
                  <ul className="dropdown-menu">
                    <li><Link >Action</Link></li>
                    <li><Link >Another action</Link></li>
                    <li><Link >Something else here</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link >Separated link</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link >One more separated link</Link></li>
                  </ul>
                </li>
              </ul>
              <form className="navbar-form navbar-right">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
            </div>
          </div>
        </nav> 
        <div className="Main">
          <Route exact path="/" render={() => <Home {...this.props}/> }/>
          <Route path="/upload" render={() => <Upload {...this.props}/>}/> 
        </div>
        </Router>  
      );
    }
}
