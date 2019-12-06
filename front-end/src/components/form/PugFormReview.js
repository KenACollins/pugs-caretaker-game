// PugFormReview displays the previously entered form data in read-only mode for user's review before final submission which occurs below.
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from "react-router";
import * as actions from '../../actions';

// props is passed in. Destructure to extract just the onCancel and formValues properties.
const PugFormReview = ({ onCancel, formValues, submitPugRequest, history }) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Ready to take care of a new pug?</h5>
            <h6>Please confirm your entries or click Back to return to the previous screen to make changes.</h6>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" style={{marginTop: '40px'}} onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" style={{marginTop: '40px'}} onClick={() => submitPugRequest(formValues, history)}>
                Add Pug
                <i className="material-icons right">pets</i>
            </button>
        </div>
    );
};

/**
 * Function that takes our Redux state and transforms it into props.
 * Name of this function does not matter, but we normally choose 'mapStateToProps'.
 * Here, we pass state containing form values to a formValues property we access above.
 */
function mapStateToProps(state) {
    return { formValues: state.form.pugFormEdit.values };
}

export default connect(mapStateToProps, actions)(withRouter(PugFormReview));