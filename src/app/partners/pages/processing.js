import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { deleteResumeDetails, getResume } from "../../axios";
import {
  Modal,
  Form,
  //  Select,
  Input,
  DatePicker,
} from "antd";

import { useSelector } from "react-redux";
const { confirm } = Modal;
const Index = () => {
  const partner = useSelector((state) => state.company);
  const [datas, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [addvisible, setAddvisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getAllResume();
  }, []);

  const deleteResume = (id) => {
    deleteResumeDetails(id).then((val) => {
      if (val.data.status === 200) {
        getAllResume();
        console.log(val.data);
      }
    });
  };
  const showConfirm = (event, id) => {
    confirm({
      title: "Do you Want to delete these items?",
      // icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        deleteResume(id);
      },
      onCancel() {},
    });
  };
  const getAllResume = () => {
    getResume().then((val) => {
      if (val.data.status === 200) {
        setDates(val.data.result);
      }
    });
  };
  const handleCancel = () => {
    setVisible(false);
    // setAddvisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  // const createhandleSubmit = (values) => {
  //   console.log(values);
  // };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <>
      <MaterialTable
        options={{
          exportButton: {
            csv: true,
            // pdf: true,
          },
          actionsColumnIndex: -1,
        }}
        columns={[
          { title: "S.No", field: "id" },
          { title: "Candidate Name", field: "name" },
          // { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "Technology", field: "tech" },
          { title: "Client Name", field: "company" },
          { title: "Start Date", field: "date" },
          { title: "Interview Status", field: "interview" },
          { title: "Budget", field: "budget" },
        ]}
        data={datas.filter((data) => data.company === partner.name)}
        // data={datas}
        title="PROCESSING LIST"
        actions={
          partner.role
            ? ""
            : [
                {
                  icon: "delete",
                  tooltip: "Delete User",
                  onClick: (event, rowData) => showConfirm(event, rowData.id),
                },
                {
                  icon: "edite",
                  tooltip: "edite",
                  onClick: (event, rowData) => setVisible(true),
                },
                // {
                //   icon: "add",
                //   tooltip: "Add User",
                //   isFreeAction: true,
                //   onClick: (event) => setAddvisible(true),
                // },
              ]
        }
      />
      {/* ### update cadidate list */}

      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <h6>Update list</h6>

          <Form.Item
            label="Candidate Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" candidate Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email !" },
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Technology"
            name="tech"
            rules={[
              { required: true, message: "Please input your technology!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="client Name"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Dtae"
            name="date"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Interview Status"
            name="interviewStatus"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Budget"
            name="budjet"
            rules={[{ required: true, message: "Please input your budjet!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ### create cadidate list */}
      {/* 
      <Modal visible={addvisible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={createhandleSubmit}>
          <h6>Create list</h6>

          <Form.Item
            label="Candidate Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" candidate Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email !" },
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Technology"
            name="tech"
            rules={[
              { required: true, message: "Please input your technology!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="client Name"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Dtae"
            name="date"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Interview Status"
            name="interviewStatus"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          {/* 
          <Form.Item
            label="Status"
            name="status"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value="processing">Processing</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="duplication">Duplication</Select.Option>
              <Select.Option value="offergot">Offer Got</Select.Option>
            </Select>
          </Form.Item> 
        </Form>
      </Modal> */}
    </>
  );
};
export default Index;
