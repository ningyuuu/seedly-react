import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends Component {
  render() {
    const comments = this.props.comments.map(x => (
      <Comment data={x} key={x.id} />
    ));

    return (<div>
      {comments}
    </div>);
  }

  static propTypes = {
    comments: PropTypes.array.isRequired
  }
}

export default Comments;