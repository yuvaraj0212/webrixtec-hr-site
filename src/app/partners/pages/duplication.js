import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { deleteResumeDetails, getResume } from "../../axios";
import { Modal, Form, Select, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { useSelector } from "react-redux";
const { confirm } = Modal;
const Index = () => {
  const partner = useSelector((state) => state.company);
  const [datas, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
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
    form.resetFields();
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
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
          {/* 
          <Form.Item
            label="Mobile"
            name="phone"
            rules={[{ required: true, message: "Please input your mobile!" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item> */}

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
            label="Status"
            name="DuplicationStatus"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value="clieantDuplication">
                Client Duplication
              </Select.Option>
              <Select.Option value="vendorDuplicationed">
                Vendor Duplication
              </Select.Option>
              <Select.Option value="inhouseDuplication">
                Inhouse Duplication
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Message" name={"DuplicationMessage"}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <MaterialTable
        options={{
          exportButton: {
            csv: true,
            // pdf: true,
          },
          actionsColumnIndex: -1,
        }}
        columns={[
          { title: "ID", field: "id" },
          { title: "Candidate Name", field: "name" },
          // { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "Clieant Name", field: "company" },
          { title: "Status", field: "DuplicationStatus" },
          { title: "Message", field: "DuplicationMessage" },
        ]}
        data={datas.filter((data) => data.company === partner.name)}
        // data={datas}
        title="DUPLICATION LIST"
        actions={
          partner.role === "partner"
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
              ]
        }
      />
    </>
  );
};
export default Index;
