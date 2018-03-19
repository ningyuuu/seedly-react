import React, { Component } from 'react';
import Comments from './Comments';
import Poster from './Poster';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false
    }
  }

  generateCommentsCount = (comments) => {
    if (!comments) return;
    return <span className="Post-comment-likes">&nbsp;|&nbsp; 
    <span className="Post-comments-count" onClick={this.showComments} >{comments.data.length} comment{comments.data.length===1?'':'s'}</span></span>
  }

  showComments = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  render() {
    const comments = this.state.showComments ?
      (<Comments comments={this.props.data.comments.data} />) :
      null;
    // console.log(this.props.data.comments.data);
    return (
      <div className="Post-comment">
        <span className="Post-comment-from"><Poster name={this.props.data.from.name} id={this.props.data.from.id} /></span>:&nbsp;
        <span className="Post-comment-message">{this.props.data.message}</span><br />
        <span className="Post-comment-likes">{this.props.data.like_count} like{this.props.data.like_count===1?'':'s'}</span>
        {this.generateCommentsCount(this.props.data.comments)}
        {comments}
      </div>
    );
  }
}

export default Comment;