// PugAddForm shows PugFormEdit and PugFormReview.
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PugFormEdit from './PugFormEdit';
import PugFormReview from './PugFormReview';

class PugAddForm extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <PugFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }
        return <PugFormEdit onFormSubmit={() => this.setState({ showFormReview: true })} />;
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        );
    }
}

/**
 * The default value of the destroyOnUnmount property is true so this takes care of dumping the form fields
 * if user either clicks the Cancel button in PugFormEdit or abandons the form by clicking an option in the
 * header that takes user away from form.
 */
export default reduxForm({
    form: 'pugFormEdit' // Tell Redux Form how to correctly manage (i.e., namespace) all of the values for THIS particular form inside the form reducer.
})(PugAddForm);