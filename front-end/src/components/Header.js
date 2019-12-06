// This is the header navigation bar at the top of every screen.
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link
                    to={'/'}
                    className="left brand-logo"
                >
                    Pugs!
                </Link>
                <Link
                    to={'/pugs'}
                    className="right"
                >
                    Let's Go!
                </Link>
            </div>
        </nav>
    );
};

export default Header;