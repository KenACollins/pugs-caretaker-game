// This component displays an individual pug - image and metadata that includes name, temperament, weight, and health status.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pugNeglected, removePug, countDeadPugs } from '../actions';
import { UNDERWEIGHT_WEIGHT_THRESHOLD, OVERWEIGHT_WEIGHT_THRESHOLD } from '../reducers/unhealthyStates';
import { UNDERWEIGHT_COUNTDOWN_TOTAL, UNDERWEIGHT_COUNTDOWN_THRESHOLD } from '../reducers/unhealthyStates';
import { OVERWEIGHT_COUNTDOWN_TOTAL, OVERWEIGHT_COUNTDOWN_THRESHOLD } from '../reducers/unhealthyStates';
import { NEGLECTED_COUNTDOWN_TOTAL, NEGLECTED_COUNTDOWN_THRESHOLD, ACTIVE_COUNTDOWN_TOTAL } from '../reducers/unhealthyStates';

class PugCard extends Component {
    state = { secondsTilDeath: null };
    deathTimerId = null;
    activeTimerId = null;
    activeLifeRemainingInSeconds = ACTIVE_COUNTDOWN_TOTAL;
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

    showSecondsUntilDeath() {
        if (Number.isInteger(this.state.secondsTilDeath)) {
            return <span>&rarr; dead in {this.state.secondsTilDeath}</span>;
        }
        return '';
    }

    /**
     * Only when the fading out animation has concluded for pug do we permanently remove it from state.
     * @param {SyntheticEvent} event - React event wrapper for cross-browser compatibility, not to be confused with DOM event handling 
     */
    onAnimationEnd = (event) => {
        if (event.animationName === 'fadeOutKF') {
            this.props.removePug(this.props.id);    // Call removePug() action creator to kick off state.pugs change for dead pug.
            this.props.countDeadPugs();             // Increment running count of pugs that have died under caretaker's watch.
        }
    }

    /**
     * Death timer is in effect when a pug has crossed over into unhealthy status due to any of three possible conditions:
     * o Being walked so much its weight goes below the low boundary threshold (configurable, but presently coded as 10 pounds)
     * o Being fed so much its weight rises above the high boundary threshold (configurable, but presently coded as 20 pounds)
     * o Residing in the safe range (i.e., between 10-20 pounds) for too long without being walked or fed.
     */
    startDeathTimer = () => {
        this.pugLifeRemainingInSeconds--;
        console.log(`${this.props.name} countdown to death: ${this.pugLifeRemainingInSeconds}`);
        if (this.pugLifeRemainingInSeconds <= this.pugLifeCountdownThreshold) {
            this.setState({ secondsTilDeath: this.pugLifeRemainingInSeconds });
        }
        if (this.pugLifeRemainingInSeconds === 0) { // Cancel timer, fade out dead pug, and remove it from state.
            console.log(`Time is up. ${this.props.name} has died with deathTimerId:`, this.deathTimerId);
            this.stopDeathTimer();
            this.cardRef.current.classList.add('fadeOut');
            // We wait for the nice fade out effect to finish before removing pug from state in the onAnimationEnd() method.
        }
    }
    
    stopDeathTimer = () => {
        clearInterval(this.deathTimerId);   // Cancel death timer.
        this.deathTimerId = null;           // Clear timer ID.
    }

    /**
     * Active timer is in effect when pug first appears on the screen. As long as the caretaker takes an active interest in 
     * the pug via feeding and/or walking it, this timer will be reset. If pug goes for a long time without being fed or walked,
     * it will become sluggish and deemed unhealthy and the death timer will be activated to countdown to its demise.
     * will reset the timer
     */
    startActiveTimer = () => {
        this.activeLifeRemainingInSeconds = ACTIVE_COUNTDOWN_TOTAL;
        this.activeTimerId = setInterval(this.runActiveTimer, 1000);    // Start active timer and save assigned ID.
        console.log(`Starting new active timer for ${this.props.name}, assigning activeTimerId:`, this.activeTimerId);
        console.log(`${this.props.name} beginning active life: ${this.activeLifeRemainingInSeconds}`);
    }

    runActiveTimer = () => {
        this.activeLifeRemainingInSeconds--;
        console.log(`${this.props.name} active countdown before unhealthy state: ${this.activeLifeRemainingInSeconds}`);
        if (this.activeLifeRemainingInSeconds === 0) {  // Cancel timer and mark pug as unhealthy.
            console.log(`Active time is up. ${this.props.name} has now crossed over into unhealthy state due to neglect, id:`, this.activeTimerId);
            this.stopActiveTimer();
            this.props.pugNeglected(this.props.id);     // Call pugNeglected() action creator to change pug's state to unhealthy.
        }
    }

    stopActiveTimer = () => {
        clearInterval(this.activeTimerId);   // Cancel active timer.
        this.activeTimerId = null;           // Clear timer ID.
    }

    /**
     * Every time this component renders it will have a new set of props and state. We want to check to see if the pug is healthy
     * at this point because if not, we need to activate a 'death timer' to countdown to his or her demise. Once caretaker
     * takes appropriate action to feed or walk pug to restore its health, we can cancel the timer.
     */
    checkPugHealthStatus() {
        const { name, isUnhealthy } = this.props;    // Destructure incoming props parameter.
        if (isUnhealthy) {
            // componentDidUpdate(): Cancel active timer if pug has become unhealthy due to excessive walking or feeding, not neglect.
            if (this.activeTimerId !== null) { this.stopActiveTimer(); }

            // componentDidMount():  Reactivate death timer if caretaker left pugs screen while unhealthy timer was in effect and has now returned.
            // componentDidUpdate(): Activate death timer if, after feed/walk clicks or neglect, this is first time pug has crossed over into unhealthy state.
            if (this.deathTimerId === null) {
                this.resetUnhealthyPugLifeExpectancy();
                this.deathTimerId = setInterval(this.startDeathTimer, 1000); // Activate death timer and save assigned ID.
                console.log(`Starting new timer for ${name}, assigning deathTimerId:`, this.deathTimerId);
                console.log(`${name} countdown to death: ${this.pugLifeRemainingInSeconds}`);
            }
        }
        else {  // Otherwise, pug is healthy.
            // componentDidMount():  Start active timer when pug first appears on screen.
            // componentDidUpdate(): Restart active timer since there has been feeding/walking activity that did not cause pug to become unhealthy.
            this.stopActiveTimer();     // Will not cause an error if there is no active timer to stop.
            this.startActiveTimer();

            // If pug has just returned to health after a prior unhealthy state, cancel the death timer.
            if (this.deathTimerId !== null) {
                console.log(`${name} is now healthy! Stop the timer with deathTimerId:`, this.deathTimerId);
                this.stopDeathTimer();
            }

            // If caretaker's feeding and/or walking actions saved pug's life in the final seconds, clear the '--> dead in X' message.
            if (this.state.secondsTilDeath !== null) {
                this.setState({ secondsTilDeath: null });
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
        this.checkPugHealthStatus();
    }

    componentDidUpdate() {
        this.checkPugHealthStatus();
    }

    /**
     * If caretaker leaves the pugs screen to add a new pug or to return to the landing page, this component will be destroyed
     * so we need to cancel the death timer if it is running or else this would affect performance as user continued to play the
     * game with a never ending timer.
     */
    componentWillUnmount() {
        this.stopDeathTimer();
        this.stopActiveTimer();
    }

    render() {
        const { id, name, temperament, weight, url, pugCare, isUnhealthy } = this.props;    // Destructure incoming props parameter.

        return (
            <>
                <div className="card" ref={this.cardRef} onAnimationEnd={this.onAnimationEnd}>
                    <div className="card-image">
                        <img src={url} alt={`${temperament[0]} pug`} />
                    </div>
                    <div className="card-content">
                        <span className="card-title">{name}</span>
                        <p className={(isUnhealthy) ? 'unhealthyTemperament' : null}>{temperament[0]} {this.showUnhappyIcon()} {this.showSecondsUntilDeath()}</p>
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
                    .unhealthyTemperament { color: red; }
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

export default connect(null, { pugNeglected, removePug, countDeadPugs })(PugCard);