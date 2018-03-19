import React, { Component } from 'react';
import request from 'request';

import Post from './components/Post';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: '',
      feed: 'Fetching data, please wait',
      loaded: false
    }
  }

  componentWillMount() {
    this.mountFeed();
  }

  mountFeed = () => {
    request
      .get('http://localhost:8080/feed', (err, response) => {
        try { 
          const jsondata = JSON.parse(response.body);
          this.setState({
            loaded: true,
            title: jsondata.name,
            feed: jsondata.feed.data
          });
        } catch(e) {
          this.setState({
            loaded: true,
            title: 'Error! Failed to fetch from Facebook.',
            feed: []
          }); 
        }
      });
  }

  render() {
    if (!this.state.loaded) {
      return <div className="loading" />;
    }

    const posts = this.state.feed.map(x => (
      <Post
        from={x.from}
        date={x.created_time}
        text={x.message}
        picture={x.full_picture}
        likes={x.likes}
        comments={x.comments}
        attachment={x.attachments}
        key={x.id}
      />
    ));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <div className="App-intro">
          {posts}
        </div>
      </div>
    );
  }
}

export default App;
