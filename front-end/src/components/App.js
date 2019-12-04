import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/pugs" component={Dashboard} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

/**
 * connect() function allows App to call action creators.  It accepts parameters.
 * o mapStateToProps - we don't have so pass null.
 * o actions - all the different action creators we want to wire up.
 */
export default connect(null, actions)(App);