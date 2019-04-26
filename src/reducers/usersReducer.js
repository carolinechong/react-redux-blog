export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      // Add new record - do not mutate existing array
      return [...state, action.payload];
    default:
      return state;
  }
};
