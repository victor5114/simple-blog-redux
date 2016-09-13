import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../actions/index';

class PostShow extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    return <div>Show post {this.props.params.id} </div>;
  }
}

export default connect(null, { fetchPost })(PostShow);
