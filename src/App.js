import "./App.css";
import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Item from "./item";

import { addNewTaskAction, delTaskAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  const [addTaskForm] = Form.useForm();

  const { taskList } = useSelector((state) => state.taskList);
  const addNewTask = (value) => {
    dispatch(addNewTaskAction(value));
    addTaskForm.resetFields();
  };

  console.log(taskList);

  const renderTaskList = () => {
    return taskList.map((item, index) => {
      return <Item key={item.id} item={item} index={index} />;
    });
  };

  return (
    <div className="App">
      <div>
        <h3>Create new task</h3>
        <Form
          form={addTaskForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ title: "", description: "" }}
          onFinish={(value) => addNewTask({ id: uuidv4(), ...value })}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input your task's name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please write something about your task!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" block>
              CREATE
            </Button>
          </Form.Item>
        </Form>
      </div>
      <h2>Task List</h2>
      <div>{renderTaskList()}</div>
    </div>
  );
}

export default App;
