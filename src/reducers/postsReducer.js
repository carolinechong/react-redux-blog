// Reducer sees the ACTION, returns the data (API list of posts) off the PAYLOAD.

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_POST":
      return action.payload;
    // When app first renders, it will show default state (empty array).
    default:
      return state;
  }
};
