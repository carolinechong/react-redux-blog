# react-redux-blog

Render a list of blog posts using Redux-Thunk and Axios to make a request to JSON Placeholder API.

## App Overview + Lessons Learned
1. Used Redux Thunk and wired it up to Redux store through the use of applyMiddleware.

2. Action Creators w/ Redux Thunk
- Whenever we make an API request from an Action Creator, always make use of some middleware (ex. Redux-Thunk) to handle asynchronrous action creators.
- Rules have changed. Action Creators no longer need to return an Action object -- can also optionally return a function.
- If we return a function, it will be automatically be called with the dispatch and getState arguments (essentially giving us total control over both changing and getting data out of Redux store.

3. Solved problem of overfetching data:
- Solution V1: Used Lodash memoize function
- Solution V2: Created an Action Creator (fetchPostsAndUsers) that calls other Action Creators (fetchPosts and fetchUsers), and dispatch those Action Creators. Used several Lodash and JS functions to find a unique user id (instead of fetching complete list of users in API): chain, map, uniq, forEach.

4. Reducers w/ Redux Thunk
- Whenever we run Reducers, it will run with previous state as the first argument (default state set to empty array).
- Use switch/case syntax to handle every action (opposed to an if-statement)
- Return a new array/object of state with [...state] - must not mutate its input state.
