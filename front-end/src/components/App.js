import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PugAddForm from './form/PugAddForm';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/pugs" component={Dashboard} />
                    <Route path="/pugs/new" component={PugAddForm} />
                </div>
            </BrowserRouter>
        );
    }
}

/**
 * connect() function allows App to call action creators.  It accepts parameters.
 * o mapStateToProps - we don't have so pass null.
 * o actions - all the different action creators we want to wire up.
 */
export default connect(null, actions)(App);