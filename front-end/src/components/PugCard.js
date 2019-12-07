// This component displays an individual pug - image and metadata that includes name, temperament, and weight.
import React from 'react';

const PugCard = ({ id, name, temperament, weight, url, pugCare, isUnhealthy }) => {  // Destructure incoming props parameter.
    const showUnhappyIcon = () => {
        if (isUnhealthy) {
            // Note: A reference to an external CSS stylesheet was added to public/index.html to support material design icons.
            return <i className="tiny material-icons">mood_bad</i>
        }
        return null;
    };

    return (
        <>
            <div className="card">
                <div className="card-image">
                    <img src={url} alt={`${temperament[0]} pug`} />
                </div>
                <div className="card-content">
                    <span className="card-title">{name}</span>
                    <p className={(isUnhealthy) ? 'unhealthyTemperament' : null}>{temperament[0]} {showUnhappyIcon()}</p>
                    <p className="subtext">{weight} pounds</p>
                </div>
                <div className="card-action">
                    <button onClick={() => pugCare(id, 0.5)} className="waves-effect waves-light btn-small leftButton">Feed Me</button>
                    <button onClick={() => pugCare(id, -0.25)} className="waves-effect waves-light btn-small rightButton">Walk Me</button>
                </div>
            </div>
            <style>{`
                .card { width: 250px; margin: .5rem 2rem 1rem 0; }
                .card-image img { width: 250px; height: 200px; }
                .card .card-title { font-weight: 500; }
                .unhealthyTemperament { color: red; font-weight: 500; }
                .subtext { font-size: smaller; }
                .leftButton { margin-right: 20px; }
                .rightButton { background-color: rgb(40, 88, 123); }
            `}</style>
        </>
    );
};

export default PugCard;