import React from "react";
import { Switch, Route } from 'react-router-dom';

import NavigationUser from './NavigationUser';
import ListPage from '../ListPage';
import MypollsPage from './MypollsPage';
import NewpollPage from './NewpollPage';

class WelcomePage extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/private" component={ListPage}/>
          <Route path="/private/:userid/mypolls" component={MypollsPage}/>
          <Route path="/private/:userid/newpoll" component={NewpollPage}/>
        </Switch>
      </div>
    )
  }
};

export default WelcomePage;
