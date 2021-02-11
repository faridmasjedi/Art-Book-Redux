import React from 'react';
import ReactDOM from 'react-dom';
import store from './config/store';
import { Provider } from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Add from './components/Add';
import Art from './components/Art';
import Update from './components/Update';

const Routes = (
  <Provider store={ store }>
    <Router>  
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={Add} />
        <Route path="/art/:id" component={Art} />
        <Route path="/update/:id" component={Update} />
      </div>
    </Router>
  </Provider>
  
)

ReactDOM.render(<Provider store={ store }> {Routes} </Provider> , document.getElementById('root'));

