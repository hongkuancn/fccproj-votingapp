import React, { Component } from 'react';

import Navigation from './Navigation';
import NavigationUser from './user/NavigationUser';
import './App.css';
import './bootstrap.min.css';

class App extends Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        {true ? <Navigation /> : <NavigationUser />}
        {this.props.children}
      </div>
    );
  }
}

export default App;
