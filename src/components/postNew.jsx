import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';

import { createPost } from '../actions/index';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post',
  },
  categories: {
    type: 'input',
    label: 'Enter some categories to this post',
  },
  content: {
    type: 'input',
    label: 'Post Contents',
  },
};

class PostNew extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    createPost: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created navigate the username
        // to the index. We navigate by calling this.context.router.push
        // new path to navifate to
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div
        className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''} `}
      >
        <label htmlFor={fieldConfig.label}>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3> Create a new post</h3>
        { _.map(FIELDS, this.renderField) }
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

// connect: 1st arg is mapStateToProps 2nd is mapDispatchToProps
// reduxForm: 1st arg is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate,
}, null, { createPost })(PostNew);
