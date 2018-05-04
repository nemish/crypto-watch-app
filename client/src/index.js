import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.styl';
import './tailwind.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import storeObj from './store';

export const store = storeObj;

ReactDOM.render(
  <Provider store={storeObj}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
