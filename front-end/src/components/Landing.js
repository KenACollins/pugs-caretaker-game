// This is the welcome page that appears when users first launch web app
// Extra Extra Credit: If I (Ken) get to add authentication, then users who are not logged in will be directed here.
import React from 'react';

const Landing = () => {
    return (
        <>
            <div className="center">
                <h1>Pugs!</h1>
                Manage a collection of virtual pets.
            </div>
            <style>{`.center { text-align: center; }`}</style>
        </>
    );
};

export default Landing;