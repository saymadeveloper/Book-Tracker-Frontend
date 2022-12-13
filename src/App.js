import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './modules/Login';
import SignUp from './modules/SignUp';
import MyBook from './modules/MyBook';
import MyFavoriteBook from './modules/MyFavoriteBook';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/my-book" component={MyBook} />
          <Route path="/my-favorite-books" component={MyFavoriteBook} />
        </Switch>
      </Router>
    </div>
     
  );
}
