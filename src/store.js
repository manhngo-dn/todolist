import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./redux/reducers/taskList.reducer";

export default configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});
