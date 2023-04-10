import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from './meeting';

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
