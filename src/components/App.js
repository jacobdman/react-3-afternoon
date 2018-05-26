import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

import axios from 'axios';

const BASE = 'https://practiceapi.devmountain.com/api/posts'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios({
      method: 'GET',
      url: BASE,
    }).then(result => {
      this.setState({ posts: result.data })
    })

  }

  updatePost(id, text) {
    axios({
      method: 'PUT',
      url: BASE + '?id=' + id,
      data: {
        text: text
      }
    })
    .then( (response) => {
      this.setState({
        posts: response.data
      })
    })
    .catch((err) => {
      console.log('Delete Post had an error', err)
    })
  }

  deletePost(id) {
    axios.delete(BASE + '?id=' + id)
    .then((response) => {
      this.setState({
        posts: response.data
      })
    })

  }

  createPost(text) {
    return axios({
      method: 'POST',
      url: BASE,
      data: {
        text: text
      }
    .then((response) => {
      this.setState({
        post: response.data
      })
    })
  })
  .catch((err) => {
    console.log('Create Post had an error', err)
  })
  }
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          createPostFN={this.createPost}
          {
            posts.map( post => (
              <Post 
              key={ post.id } 
              text={ post.text } 
              date={ post.date } 
              id={ post.id } 
 
              updatePostFN={this.updatePost} 
              deletePostFN={this.deletePost}
              />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;

