import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import UserChat from './components/UserChat';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
      </header>
      <div className="content">
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/user/:id" exact component={UserChat} />
          <Route path="/" exact render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
