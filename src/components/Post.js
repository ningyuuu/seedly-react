import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Comments from './Comments';
import Pictures from './Pictures';
import Poster from './Poster';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false
    };
  }

  display(link) {
    // if it has attachments, we should use attachments, if not, we should use full_picture!
    // TODO: create a new component to hold this properly!!
    if (link) {
      return (<div className="Post-picture"><img src={link} alt={`Post by ${this.props.from}`} /></div>);
    }

    return null;
  }

  displayPictures(pictureUrl, attachments) {

    console.log(attachments);
    if (!pictureUrl) {
      return;
    }

    if (!attachments) {
      return (<Pictures pictures={[pictureUrl]}/>); 
    }

    return (<Pictures pictures={attachments.data[0].subattachments.data.map(x => x.media.image.src)}/>);
  }

  parseDate(string) {
    // 2017-07-20T07:21:14+0000
    const mymoment = moment(string, 'YYYY-MM-DDTHH:mm:ssZ');
    return mymoment.format('lll');
  }

  getLikesLength(likes) {
    if (likes.data) {
      return likes.data.length;
    }

    return 0;
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  generateCommentsButton(comments) {
    if (comments) {
      return (<span> | 
        <span className="Post-comments-count" onClick={this.toggleComments}>
          {` ${comments.data.length} comment${comments.data.length===1?'':'s'}`}
        </span>
      </span>);
    }
    return;
  }

  render() {
    const comments = this.state.showComments ? <Comments comments={this.props.comments.data} /> : null;
    return (
      <div className="Post">
        <p>Posted by <Poster id={this.props.from.id} name={this.props.from.name} /> at 
          <span className="Post-date"> {this.parseDate(this.props.date)}</span>
        </p>
        <p>{this.props.text}</p>
        {this.displayPictures(this.props.picture, this.props.attachment)}
        <div className="Post-likes">
          {this.getLikesLength(this.props.likes)} likes{this.generateCommentsButton(this.props.comments)}
        </div>
        {comments}
      </div>
    );
  }

  static propTypes = {
    from: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    picture: PropTypes.string,
    comments: PropTypes.object,
    likes: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  }

  static defaultProps = {
    from: {},
    date: '',
    text: '',
    picture: '',
    comments: null,
    likes: {}
  }
}

export default Post;
