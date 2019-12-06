// This component manages the display of one or more pug cards.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPugs, servicePug, startGame } from '../actions';
import PugCard from './PugCard';

class PugList extends Component {
    /**
     * When starting a new game, invoke fetchPugs action creator to load starting set of pugs into state.pugs property that we receive below in this.props.pugs.
     * Then invoke startGame() action creator to change loadOriginalPugsList state property to false so we prevent reloading original pugs as game play progresses.
     */
    componentDidMount() {
        const { loadOriginalPugsList, fetchPugs, startGame } = this.props;
        if (loadOriginalPugsList) {
            fetchPugs();
            startGame();
        }
    }
    
    renderList() {
        const { pugs, servicePug } = this.props;
        return pugs.map(({ id, name, temperament, weightInPounds, url, isUnhealthy }) => {
            return (
                <PugCard key={id} id={id} name={name} temperament={temperament} weight={weightInPounds}
                    url={url} pugCare={servicePug} isUnhealthy={isUnhealthy} />
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
    return { pugs: state.pugs, loadOriginalPugsList: state.loadOriginalPugsList };
};

export default connect(mapStateToProps, { fetchPugs, servicePug, startGame })(PugList);