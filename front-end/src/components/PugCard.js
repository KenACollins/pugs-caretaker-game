// This component displays an individual pug - image and metadata that includes name, temperament, weight, and health status.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePug } from '../actions';
import { UNDERWEIGHT_WEIGHT_THRESHOLD, OVERWEIGHT_WEIGHT_THRESHOLD } from '../reducers/unhealthyStates';
import { UNDERWEIGHT_COUNTDOWN_TOTAL, UNDERWEIGHT_COUNTDOWN_THRESHOLD } from '../reducers/unhealthyStates';
import { OVERWEIGHT_COUNTDOWN_TOTAL, OVERWEIGHT_COUNTDOWN_THRESHOLD } from '../reducers/unhealthyStates';
import { NEGLECTED_COUNTDOWN_TOTAL, NEGLECTED_COUNTDOWN_THRESHOLD } from '../reducers/unhealthyStates';

class PugCard extends Component {
    deathTimerId = null;
    pugLifeRemainingInSeconds = 9999999;    // Just set to a big number on initialization. Will be reset if pug becomes unhealthy.
    pugLifeCountdownThreshold = 9999999;    // Just set to a big number on initialization. Will be reset if pug becomes unhealthy.
    cardRef = React.createRef();    // Access pug card through React, rather than via DOM with document.querySelector(".card").

    showUnhappyIcon() {
        if (this.props.isUnhealthy) {
            // Note: A reference to an external CSS stylesheet was added to public/index.html to support material design icons.
            return <i className="tiny material-icons">mood_bad</i>
        }
        return null;
    }

    startDeathTimer = () => {
        this.pugLifeRemainingInSeconds--;
        console.log(`${this.props.name} countdown to death: ${this.pugLifeRemainingInSeconds}`);
        if (this.pugLifeRemainingInSeconds === 0) { // Cancel timer, fade out dead pug, and remove it from state.
            // alert(`Sadly, ${this.props.name} has died.`);
            console.log(`Time is up. ${this.props.name} has died with deathTimerId:`, this.deathTimerId);
            this.stopDeathTimer();
            this.cardRef.current.classList.add('fadeOut');
            this.props.removePug(this.props.id);    // Call removePug() action creator to kick off state.pugs change for dead pug.  
        }
    }

    stopDeathTimer = () => {
        clearInterval(this.deathTimerId);   // Cancel death timer.
        this.deathTimerId = null;           // Clear timer ID for possible unhealthy status in future.
    }

    /**
     * Every time this component renders it will have a new set of props and state. We want to check to see if the pug is healthy
     * at this point because if not, we need to activate a 'death timer' to countdown to his or her demise. Once caretaker
     * takes appropriate action to feed or walk pug to restore its health, we can cancel the timer.
     */
    checkPugHealthStatus() {
        const { name, isUnhealthy } = this.props;    // Destructure incoming props parameter.
        if (isUnhealthy) { 
            // componentDidUpdate(): Activate death timer if, after feed/walk clicks, this is the first time pug has crossed over into unhealthy state.
            // componentDidMount():  Reactivate death timer if caretaker left pugs screen while unhealthy timer was in effect and has now returned.
            if (this.deathTimerId === null) {
                this.resetUnhealthyPugLifeExpectancy();
                this.deathTimerId = setInterval(this.startDeathTimer, 1000); // Activate death timer and save assigned ID.
                console.log(`Starting new timer for ${name}, assigning deathTimerId:`, this.deathTimerId);
                console.log(`${name} countdown to death: ${this.pugLifeRemainingInSeconds}`);
            }
        }
        else {  // Otherwise, pug is healthy.
            if (this.deathTimerId !== null) { // If pug has just returned to health after a prior unhealthy state, cancel the death timer.
                console.log(`${name} is now healthy! Stop the timer with deathTimerId:`, this.deathTimerId);
                this.stopDeathTimer();
            }
        }
    }

    resetUnhealthyPugLifeExpectancy() {
        const { weight } = this.props;    // Destructure incoming props parameter.
        if (weight < UNDERWEIGHT_WEIGHT_THRESHOLD) {
            this.pugLifeRemainingInSeconds = UNDERWEIGHT_COUNTDOWN_TOTAL;
            this.pugLifeCountdownThreshold = UNDERWEIGHT_COUNTDOWN_THRESHOLD;
        }
        else if (weight > OVERWEIGHT_WEIGHT_THRESHOLD) {
            this.pugLifeRemainingInSeconds = OVERWEIGHT_COUNTDOWN_TOTAL;
            this.pugLifeCountdownThreshold = OVERWEIGHT_COUNTDOWN_THRESHOLD;
        }
        else {  // Otherwise, a pug in the normal range has become unhealthy due to a long period of inactivity.
            this.pugLifeRemainingInSeconds = NEGLECTED_COUNTDOWN_TOTAL;
            this.pugLifeCountdownThreshold = NEGLECTED_COUNTDOWN_THRESHOLD;
        }
    }

    componentDidMount() {
        console.log('Running componentDidMount()...');
        this.checkPugHealthStatus();
    }

    componentDidUpdate() {
        console.log('Running componentDidUpdate()...');
        this.checkPugHealthStatus();
    }

    /**
     * If caretaker leaves the pugs screen to add a new pug or to return to the landing page, this component will be destroyed
     * so we need to cancel the death timer if it is running or else this would affect performance as user continued to play the
     * game with a never ending timer.
     */
    componentWillUnmount() {
        console.log(`${this.props.name} is leaving pugs screen. Stopping timer, if one is in effect, in componentWillUnmount():`, this.deathTimerId);
        clearInterval(this.deathTimerId);
        this.deathTimerId = null;
    }

    render() {
        const { id, name, temperament, weight, url, pugCare, isUnhealthy } = this.props;    // Destructure incoming props parameter.

        return (
            <>
                <div className="card" ref={this.cardRef}>
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
                    .fadeOut { animation: fadeOutKF 1s; }
                    @keyframes fadeOutKF { from { opacity: 1; } to { opacity: 0; } }
                `}</style>
            </>
        );
    }

}

export default connect(null, { removePug })(PugCard);