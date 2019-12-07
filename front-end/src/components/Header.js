// This is the header navigation bar at the top of every screen.
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="subdued-purple">
                <div className="nav-wrapper container">
                    <Link
                        to={'/'}
                        className="left brand-logo"
                    >
                        Pugs!
                    </Link>
                </div>
            </nav>
            <style>{`.subdued-purple { background-color: rgb(127, 124, 175); }`}</style>
        </>
    );
};

export default Header;