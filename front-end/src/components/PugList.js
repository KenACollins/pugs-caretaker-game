import React from 'react';
import { connect } from 'react-redux';
import { fetchPugs, fetchImage } from '../actions';
import PugCard from './PugCard';

class PugList extends React.Component {
    componentDidMount() {
        // Invoke this action creator to kick off Redux flow and update state.pugs property.
        this.props.fetchPugs();
        this.props.fetchImage();
    }
    
    renderList() {
        console.log('PugList props image', this.props.image);
        return this.props.pugs.map(pug => {
            //return <PugCard key={pug.id} name={pug.name} temperament={pug.temperament} weight={pug.weightInPounds} url={pug.url} />
            return <PugCard key={pug.id} name={pug.name} temperament={pug.temperament} weight={pug.weightInPounds} url={this.props.image} />
        });
    }
    render() {
        return <div style={{display: 'flex', flexWrap: 'wrap'}}>{this.renderList()}</div>
    }
};

const mapStateToProps = state => {
    return { pugs: state.pugs, image: state.image };
};

export default connect(mapStateToProps, { fetchPugs, fetchImage })(PugList);