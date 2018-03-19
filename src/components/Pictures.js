import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pictures extends Component {
  render() {
    const imgs = this.props.pictures.map(url => (
      <img src={url} alt={`Attached`} key={url} />
    ));
    return (
      <div className="Post-picture">{imgs}</div>
    );
  }

  static propTypes = {
    pictures: PropTypes.array.isRequired
  }

  static defaultProps = {
    pictures: []
  }
}