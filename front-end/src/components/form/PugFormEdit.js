// PugFormEdit displays an editable form for a user to add a new pug.
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PugField from './PugField';
import formFields from './formFields';

class PugFormEdit extends Component {
    renderFields() {
        return (
            <div>
                {formFields.map(field => (<Field key={field.name} type="text" {...field} component={PugField} />))}
            </div>
        );
    }

    render() {
        return (
            <>
                <div className="container">
                    <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                        {this.renderFields()}
                        <Link to="/pugs" className="subdued-purple-secondary-button btn-flat">
                            Cancel
                        </Link>
                        <button type="submit" className="subdued-purple btn-flat right white-text">
                            Next
                            <i className="material-icons right">done</i>
                        </button>
                    </form>
                </div>
                <style>{`
                    .subdued-purple { background-color: rgb(127, 124, 175); }
                    .subdued-purple-secondary-button { border: 2px solid rgb(127, 124, 175); color: rgb(127, 124, 175); }
                `}</style>
            </>
        );
    }
}

/**
 * Create validate() function with rules for form validation. It will be the values set for validate property passed in export to reduxForm().
 * Note: Redux Form automatically runs our validate() function the first time it loads the form. This can be annoying for users to get errors
 * before they have begun to fill out the form. We take care of avoiding missing fields errors in the PugField component by checking if
 * fields are touched.
 * @param {Object} values Object supplied by Redux Form containing the name properties and user-entered data of all form fields. Stored in
 * state.form.pugFormEdit.values.
 */
function validate(values) {
    const errors = {};

    /**
     * Verify that the user specified a valid weight in the 13-20 pounds range. Can be a floating point number, not required to be an integer.
     * This code runs when form first loads and values.weightInPounds is null. Avoid error with 'or empty string' clause.
     * If this code were placed after the formFields.forEach() statement, the invalid weight error would replace the missing weight error.
     */
    const weightEntered = Number(values.weightInPounds);
    if (isNaN(weightEntered) || weightEntered < 13 || weightEntered > 20) {
        errors.weightInPounds = "Weight must be a number between 13 and 20.";
    }
    else {
        errors.weightInPounds = '';
    }

    // All fields are required. Check for missing values.
    formFields.forEach( ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });


    return errors;
}

// Redux Form Helper initializes and helps configure the pug form we are about to work on.
export default reduxForm({
    validate,               // ES6 consise syntax for matching property and value, validate: validate.
    form: 'pugFormEdit',    // Tell Redux Form how to correctly manage (i.e., namespace) all of the values for THIS particular form inside the form reducer.
    destroyOnUnmount: false // When false, don't dump the form field data when PugFormEdit is no longer on-screen. Default is true. Applies to Next button but not Cancel.
})(PugFormEdit);