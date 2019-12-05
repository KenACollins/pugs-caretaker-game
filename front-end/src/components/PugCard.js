import React from 'react';

const PugCard = ({ name, temperament, weight, url }) => {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card" style={{width: '250px'}}>
                    <div className="card-image">
                        <img src={url} alt={`${temperament} pug`} style={{width: '250px', height: '200px'}}/>
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