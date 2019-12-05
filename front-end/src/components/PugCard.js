// This component displays an individual pug - image and metadata that includes name, temperament, and weight.
import React from 'react';

const PugCard = ({ id, name, temperament, weight, url, pugCare }) => {  // Destructure incoming props parameter.
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
                        <button onClick={() => pugCare(id, 0.5)} className="waves-effect waves-light btn-small" style={{marginRight: '20px', backgroundColor: 'purple'}}>Feed Me</button>
                        <button onClick={() => pugCare(id, -0.25)} className="waves-effect waves-light btn-small">Walk Me</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PugCard;