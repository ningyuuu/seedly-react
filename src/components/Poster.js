import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Poster extends Component {
  getProfilePic(id) {
    if (!id) {
      return;
    }
    return <img src={`https://graph.facebook.com/${id}/picture?type=square`} alt={id} className="Post-profilePic" />
  }

  render() {
    return (
      <span className="Post-from">{this.getProfilePic(this.props.id)}{this.props.name}</span>
    )
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  static defaultProps = {
    id: null,
    name: 'Unknown Poster'
  }
}