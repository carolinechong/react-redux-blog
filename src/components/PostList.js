import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  componentDidMount() {
    // Call Action Creator
    this.props.fetchPostsAndUsers();
  }

  // Helper method: Take list of posts and render it out. Created this to make render() method below readable.
  // id, title, body, userId = unique JSON API properties
  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

// state obj has a property called 'posts' from reducers > index.js
// 'posts' property holds all data that the reducer has returned.

// Every time reducers run, mapStateToProps will be called again.
// This will return a new object w/ property 'posts'
// and that object will show up as the props object inside PostList component.
const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(PostList);
