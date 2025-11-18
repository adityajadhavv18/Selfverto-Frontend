import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import postReducer from "../features/posts/postSlice";
// import profileReducer from "../features/profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  //   posts: postReducer,
  //   profile: profileReducer,
});

export default rootReducer;
