import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from '../../axios';

class Blog extends Component {
  state = {
    posts: [],
    selectPostId: null,
    iserror: false
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
            ...post,
            author: "Heartly"
          };
        });
        // console.log(response);
        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        // console.log(error);
        this.setState({ iserror: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectPostId: id });
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!!</p>;

    if (!this.state.iserror) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => {
              this.postSelectedHandler(post.id);
            }}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
