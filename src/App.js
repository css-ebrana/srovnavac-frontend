import React from 'react';
import './App.css';
import 'animate.css/animate.compat.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Layout/Header';
import ProductContent from './Layout/MainContent';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FeedAddPage from './Layout/FeedAddPage';
import Footer from './Layout/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ProductContent}>
        </Route>
        <Route exact path="/feed" component={FeedAddPage}>
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
