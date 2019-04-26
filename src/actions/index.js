// ACTION CREATORS - runs code to make an API request.

import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// 1) Call action creator fetchPostsAndUsers
// 2) it will be dispatched automaticaly
// 3) thunk get it
// 4) thunk sees that it return a function
// 5) thunk runs the function
// 6) it dispatches the whole inner function of fetchPosts
// 7) thunk gets it
// 8) thunk sees that it's returning a function
// 9) so it runs it (runs fetchPosts)

// ACTION CREATOR 3
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // When calling an Action Creator from inside an Action Creator, need to dispatch the result of calling the Action Creator.
  // Call fetchPosts but wait until fetchPosts is complete first.
  await dispatch(fetchPosts());

  _.chain(getState().posts) // Call getState and reference the posts property that shows all posts from Reducer.
    .map("userId") // Lodash's version of map() JS function: map through all posts (100 total) and pull out userId property.
    .uniq() // Lodash _.uniq() used to pull only unique userIds (not all 100+ of them from API)
    .forEach(id => dispatch(fetchUser(id))) // Loop over different userIds, call the fetchUser Action Creator (to be executed), and then dispatch it.
    .value(); //execute all steps within chain.
};

// ACTION CREATOR 1: fetchPosts
// JSON API response = ARRAY = list of posts
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  // Call dispatch and pass in action object.
  // Action creator returns an 'action' with the fetched data (response.data) on the 'payload' property.
  dispatch({ type: "FETCH_POST", payload: response.data });
};

// ACTION CREATOR 2: fetchUser
// Issue: Overfetching to API, redundant network requests.
// Issue Solution V2 of 2: Non-memoized version - create new Action Creator to make network request to API just ONCE.

// JSON API response = OBJECT = author
// Function that returns a function, that calls _fetchUser.
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
