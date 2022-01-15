import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  taskList: [
    {
      id: "1",
      title: "example",
      description: "example",
    },
  ],
};

const taskListReducer = createReducer(initialState, {
  ADD_NEW_TASK: (state, action) => {
    return {
      ...state,
      taskList: [...state.taskList, action.payload],
    };
  },

  DEL_TASK: (state, action) => {
    const newTaskList = [...state.taskList];
    newTaskList.splice(action.payload, 1);
    return {
      ...state,
      taskList: newTaskList,
    };
  },

  EDIT_TASK: (state, action) => {
    const newTaskList = [...state.taskList];
    newTaskList.splice(action.payload[1], 1, action.payload[0]);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
});

export default taskListReducer;
