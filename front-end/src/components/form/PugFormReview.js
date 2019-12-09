// PugFormReview displays the previously entered form data in read-only mode for user's review before final submission which occurs below.
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { submitPugRequest } from '../../actions';
import formFields from './formFields';

/**
 * Props object is destructured to extract what we need as described below.
 * @param {Function} onCancel - callback function passed by PugAddForm component.
 * @param {Object} formValues - state.form.pugFormEdit.values set by Redux Form, passed below by mapStateToProps.
 * @param {Function} submitPugRequest - action passed below in connect component.
 * @param {Array} history - URL redirection passed by React Router withRouter() helper below.
 */
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
        <>
            <div className="container">
                <h5>Ready to take care of your new pug?</h5>
                <h6>Please confirm your entries or click Back to return to the previous screen to make changes.</h6>
                {reviewFields}
                <button className="subdued-purple-secondary-button btn-flat" style={{marginTop: '40px'}} onClick={onCancel}>
                    Back
                </button>
                <Link to="/pugs" className="subdued-purple-secondary-button btn-flat spacer-left">
                    Cancel
                </Link>
                <button className="subdued-purple btn-flat right white-text" style={{marginTop: '40px'}} onClick={() => submitPugRequest(formValues, history)}>
                    Add Pug
                    <i className="material-icons right">pets</i>
                </button>
            </div>
            <style>{`
                    .subdued-purple { background-color: rgb(127, 124, 175); margin-top: 40px; }
                    .subdued-purple-secondary-button { border: 2px solid rgb(127, 124, 175); color: rgb(127, 124, 175); margin-top: 40px; }
                    .spacer-left {margin-left: 20px; }
            `}</style>
        </>
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

export default connect(mapStateToProps, { submitPugRequest })(withRouter(PugFormReview));