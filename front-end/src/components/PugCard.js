// This component displays an individual pug - image and metadata that includes name, temperament, weight, and health status.
import React, { Component } from 'react';

class PugCard extends Component {
    state = { deathTimerId: null, pugLifeRemainingInSeconds: 10 };

    showUnhappyIcon() {
        if (this.props.isUnhealthy) {
            // Note: A reference to an external CSS stylesheet was added to public/index.html to support material design icons.
            return <i className="tiny material-icons">mood_bad</i>
        }
        return null;
    }

    deathTimer = () => {
        console.log(`Inside deathTimer for ${this.props.name}, deathTimerId is:`, this.state.deathTimerId);
        this.setState(state => ({ pugLifeRemainingInSeconds: state.pugLifeRemainingInSeconds - 1 }));
        console.log(`${this.props.name} countdown to death: ${this.state.pugLifeRemainingInSeconds}`);
        if (this.state.pugLifeRemainingInSeconds === 0) {
            alert(`Sadly, ${this.props.name} has died.`);
            console.log(`Time is up. Will reset ${this.props.name}'s deathTimerId`, this.state.deathTimerId);
            clearInterval(this.state.deathTimerId);
            this.setState({ deathTimerId: null, pugLifeRemainingInSeconds: 10 });   // Also reset pugLifeRemainingInSeconds for next time since it is zero.
        }
/*         else {
            this.setState({ deathTimerId: setTimeout(this.deathTimer, 1000) });
            console.log(`Running timer for another second with ${this.props.name}'s deathTimerId`, this.state.deathTimerId);
        } */
    }

    /**
     * Every time this component renders it will have a new set of props. We want to check to see if the pug is healthy
     * at this point because if not, we need to activate a 'death timer' to countdown to his or her demise. Once caretaker
     * takes appropriate action to feed or walk pug to restore its health, we can cancel the timer.
     */
    componentDidUpdate() {
        console.log('Running componentDidUpdate()...');
        if (this.props.isUnhealthy) {
            if (this.state.deathTimerId === null) { // If we have not yet set a death timer because this is the first time pug has crossed threshold into unhealthy state... 
                this.setState({ deathTimerId: setInterval(this.deathTimer, 1000) }); // Activate death timer.
                console.log(`Starting new timer for ${this.props.name}, assigning deathTimerId:`, this.state.deathTimerId);
                console.log(`${this.props.name} countdown to death: ${this.state.pugLifeRemainingInSeconds}`);
            }
        }
        else {  // Otherwise, pug is healthy.
            if (this.state.deathTimerId !== null) { // If pug has just returned to health after a prior unhealthy state, cancel the death timer.
                clearInterval(this.state.deathTimerId);
                this.setState({ deathTimerId: null, pugLifeRemainingInSeconds: 10 });
            }
        }
    }

    /**
     * If caretaker leaves the /pugs screen to add a new pug or to return to the landing page, this component will be destroyed
     * so we need to cancel the death timer if it is running or else this would affect performance as user continued to play the
     * game as the timer would never stop.
     */
    componentWillUnmount() {
        clearInterval(this.state.deathTimerId);
        this.setState({ deathTimerId: null, pugLifeRemainingInSeconds: 10 });   // Component is going away, we really don't need to do this.
    }

    render() {
        const { id, name, temperament, weight, url, pugCare, isUnhealthy } = this.props;    // Destructure incoming props parameter.

        return (
            <>
                <div className="card">
                    <div className="card-image">
                        <img src={url} alt={`${temperament[0]} pug`} />
                    </div>
                    <div className="card-content">
                        <span className="card-title">{name}</span>
                        <p className={(isUnhealthy) ? 'unhealthyTemperament' : null}>{temperament[0]} {this.showUnhappyIcon()}</p>
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
    }

}

export default PugCard;