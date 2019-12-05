import React from 'react';
// <img src="http://66.media.tumblr.com/tumblr_llr9e8mz5F1qaa50yo1_500.jpg" alt={`${temperament} pug`} />
const PugCard = ({ name, temperament, weight, url }) => {
    console.log(`Pug URL: ${url}`);
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card" style={{width: '250px'}}>
                    <div className="card-image">
                        <img src={url} alt={`${temperament} pug`} />
                    </div>
                    <div className="card-content">
                        <span className="card-title" style={{fontWeight: '500'}}>{name}</span>
                        <p>{temperament}</p>
                        <p style={{fontSize: 'smaller'}}>{weight} pounds</p>
                    </div>
                    <div className="card-action" style={{margin: 'auto'}}>
                        <button className="waves-effect waves-light btn-small" style={{marginRight: '20px', backgroundColor: 'magenta'}}>Feed Me</button>
                        <button className="waves-effect waves-light btn-small">Walk Me</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PugCard;