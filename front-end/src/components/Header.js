import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link
                    to={'/pugs'}
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