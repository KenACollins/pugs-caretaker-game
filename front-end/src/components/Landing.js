// This is the welcome page that appears when users first launch web app
// Extra Extra Credit: If I (Ken) get to add authentication, then users who are not logged in will be directed here.
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <div className="center">
                <h1>Pugs!</h1>
                <h6>Manage a collection of virtual pets.</h6>
                <h6><Link to={'/pugs'}>Let's Go!</Link></h6>
            </div>
            <style>{`.center { text-align: center; }`}</style>
        </>
    );
};

export default Landing;