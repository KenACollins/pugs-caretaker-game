// This is the content page that displays the current set of pugs.
import React from 'react';
import { Link } from 'react-router-dom';
import PugList from './PugList';

const Dashboard = () => {
    return (
        <div>
            <PugList />
            <div className="fixed-action-btn">
                <Link to="/pugs/new" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;