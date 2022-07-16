import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getResume, deleteResumeDetails } from "../../axios";
import {
  Modal,
  Form,
  Select,
  InputNumber,
  Upload,
  Input,
  Button,
  DatePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
const { confirm } = Modal;

const Candidate = () => {
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
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
  return (
    <>
      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <h6>Update Candidate</h6>

          <Form.Item
            label="Candidate Name"
            name="cname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" candidate Email"
            name="cemail"
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
            label="Mobile"
            name="cphone"
            rules={[{ required: true, message: "Please input your mobile!" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Candidate DOB"
            name="cDOB"
            rules={[
              {
                required: true,
                message: "Please input your Candidate DOB!",
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value={"Destination To Japan"}>DTP</Select.Option>
              <Select.Option value={"Absolute Tech"}>AT</Select.Option>
              <Select.Option value={"Nikita"}>NKT</Select.Option>
              <Select.Option value={"Red dot"}>RDT</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="job ID"
            name="jobID"
            rules={[{ required: false, message: "Please input your JOB ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mfile"
            label="file Upload"
            rules={[{ required: true, message: "Please input your resume!" }]}
          >
            <Upload listType="picture">
              <Button
              // icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Message" name={"cMSG"}>
            <TextArea rows={4} />
          </Form.Item>

          {/* <Form.Item
            label="Interview Status"
            name="interviewStatus"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
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
          </Form.Item> */}
        </Form>
      </Modal>
      <Modal visible={addvisible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={createhandleSubmit}>
          <h6>Add Candidate</h6>

          <Form.Item
            label="Candidate Name"
            name="cname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" candidate Email"
            name="cemail"
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
            label="Mobile"
            name="cphone"
            rules={[{ required: true, message: "Please input your mobile!" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Candidate DOB"
            name="cDOB"
            rules={[
              {
                required: true,
                message: "Please input your Candidate DOB!",
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value={"Destination To Japan"}>DTP</Select.Option>
              <Select.Option value={"Absolute Tech"}>AT</Select.Option>
              <Select.Option value={"Nikita"}>NKT</Select.Option>
              <Select.Option value={"Red dot"}>RDT</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="job ID"
            name="jobID"
            rules={[{ required: false, message: "Please input your JOB ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mfile"
            label="file Upload"
            rules={[{ required: true, message: "Please input your resume!" }]}
          >
            <Upload listType="picture">
              <Button
              // icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Message" name={"cMSG"}>
            <TextArea rows={4} />
          </Form.Item>

          {/* <Form.Item
            label="Interview Status"
            name="interviewStatus"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
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
          </Form.Item> */}
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
          { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "Candidate DOB", field: "date" },
          { title: "Company", field: "company" },
          { title: "job ID", field: "jobID" },
          // {
          //   title: "Status",
          //   field: "status",
          //   render: (rowData) => {
          //     let a = String(rowData.id).slice(-1);
          //     let x;
          //     if (a === "1" || a === "3" || a === "7") {
          //       x = 1;
          //     } else if (a === "2" || a === "4") {
          //       x = 2;
          //     } else if (a === "8" || a === "6") {
          //       x = 3;
          //     } else if (a === "9" || a === "5") {
          //       x = 4;
          //     }

          //     switch (x) {
          //       case 1:
          //         return (
          //           <button
          //             type="button"
          //             className="btn btn-success btn-fw btn-sm"
          //           >
          //             Offer Got
          //           </button>
          //         );
          //       case 2:
          //         return (
          //           <button
          //             type="button"
          //             className="btn btn-warning btn-fw btn-sm"
          //           >
          //             Processing
          //           </button>
          //         );
          //       case 3:
          //         return (
          //           <button
          //             type="button"
          //             className="btn btn-danger btn-fw btn-sm"
          //           >
          //             Rejected
          //           </button>
          //         );
          //       case 4:
          //         return (
          //           <button
          //             type="button"
          //             className="btn btn-secondary btn-fw btn-sm"
          //           >
          //             Duplication
          //           </button>
          //         );
          //       default:
          //         return (
          //           <button
          //             type="button"
          //             className="btn btn-primary btn-fw btn-sm"
          //           >
          //             Null
          //           </button>
          //         );
          //     }
          //   },
          // },
          {
            title: "Resume",
            field: "fileUrl",
            render: (rowData) => {
              return (
                <a
                  href={rowData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download
                </a>
              );
            },
          },

          { title: "message", field: "cMSG" },
        ]}
        // data={datas.filter((data) => data.company === "Absolute Tech")}
        data={datas}
        title="CANDIDATES"
        actions={[
          {
            icon: "delete",
            tooltip: "Delete",
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
    </>
  );
};
export default Candidate;
