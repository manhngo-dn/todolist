import React, { useState } from "react";
import { Form, Button, Card, Col, Row, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { delTaskAction, editTaskAction } from "./redux/actions";

function Item({ item, index }) {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const handleDelTask = (i) => {
    dispatch(delTaskAction(i));
  };

  const handleEditTask = (value, i) => {
    dispatch(editTaskAction([{ id: uuidv4(), ...value }, i]));
    setIsEdit(false);
  };

  const renderTaskView = () => {
    return (
      <>
        <p>
          <b>TITLE:</b> {item.title}
        </p>
        <p>
          <b>DESCRIPTION:</b> {item.description}
        </p>
      </>
    );
  };

  const [editTaskForm] = Form.useForm();

  const renderEditTask = () => {
    return (
      <Form
        form={editTaskForm}
        name={`editTaskForm-${index}`}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ title: item.title, description: item.description }}
        onFinish={(value) => {
          handleEditTask(value, index);
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your task's name" }]}
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
      </Form>
    );
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={8} offset={8}>
          <Card
            extra={
              <Space>
                {isEdit ? (
                  <>
                    <Button
                      htmlType="button"
                      onClick={() => editTaskForm.submit()}
                    >
                      Confirm
                    </Button>
                    <Button
                      htmlType="button"
                      danger
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  type="primary"
                  htmlType="button"
                  danger
                  onClick={() => handleDelTask(index)}
                >
                  Delete
                </Button>
              </Space>
            }
          >
            {isEdit ? renderEditTask() : renderTaskView()}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Item;
