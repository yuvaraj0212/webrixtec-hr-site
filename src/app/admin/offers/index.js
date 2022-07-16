import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getResume, deleteResumeDetails } from "../../axios";
import {
  Modal,
  Form,
  //  Select,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
const { confirm } = Modal;

const Index = () => {
  const [datas, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addvisible, setAddvisible] = useState(false);
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
    setAddvisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  const createhandleSubmit = (values) => {
    console.log(values);
  };
  const layout = {
    labelCol: {
      span: 10,
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
          { title: "ID", field: "id" },
          { title: "Candidate Name", field: "name" },
          // { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "client Name", field: "company" },
          { title: "Annual CTC", field: "CTC" },
          { title: "Joining Date", field: "date" },
          { title: "client Refferal %", field: "companyRef" },
          { title: "Message", field: "Message" },
        ]}
        // data={datas.filter((data) => data.company === "Absolute Tech")}
        data={datas}
        title="OFFERS"
        actions={[
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
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => setAddvisible(true),
          },
        ]}
      />
      {/* ### update cadidate list */}

      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <h6>Create list</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="client Name"
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Joining Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input your joining date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Client Reffarele %"
                name="ClientRef"
                rules={[
                  { required: true, message: "Please input Client Reffarele" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-12">
              <Form.Item
                label="Email"
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
                label="Annual CTC"
                name="CTC"
                rules={[
                  { required: true, message: "Please input your Annual CTC!" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Offer Date"
                name="offerDate"
                rules={[
                  { required: true, message: "Please input your Offer date!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item label="Message" name={"Message"}>
                <TextArea rows={4} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>

      {/* ### create cadidate list */}

      <Modal visible={addvisible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={createhandleSubmit}>
          <h6>Create list</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="client Name"
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Joining Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input your joining date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Client Reffarele %"
                name="ClientRef"
                rules={[
                  { required: true, message: "Please input Client Reffarele" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-12">
              <Form.Item
                label="Email"
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
                label="Annual CTC"
                name="CTC"
                rules={[
                  { required: true, message: "Please input your Annual CTC!" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Offer Date"
                name="offerDate"
                rules={[
                  { required: true, message: "Please input your Offer date!" },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item label="Message" name={"Message"}>
                <TextArea rows={4} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
