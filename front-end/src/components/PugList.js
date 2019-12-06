// This component manages the display of one or more pug cards.
import React from 'react';
import { connect } from 'react-redux';
import { fetchPugs, servicePug } from '../actions';
import PugCard from './PugCard';

class PugList extends React.Component {
    componentDidMount() {
        // Invoke fetchPugs action creator to kick off Redux flow and update state.pugs property that we receive below in this.props.pugs.
        this.props.fetchPugs();
    }
    
    renderList() {
        return this.props.pugs.map(pug => {
            return (
                <PugCard key={pug.id} id={pug.id} name={pug.name} temperament={pug.temperament} 
                    weight={pug.weightInPounds} url={pug.url} pugCare={this.props.servicePug} isUnhealthy={pug.isUnhealthy} />
            );
        });
    }
    render() {
        return (
            <>
                <div className="positionItems">{this.renderList()}</div>
                <style>{`.positionItems { display: flex; flex-wrap: wrap; }`}</style>
            </>    
        );    
    }
};

const mapStateToProps = state => {
    return { pugs: state.pugs };
};

export default connect(mapStateToProps, { fetchPugs, servicePug })(PugList);