import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Form,
  // Select,
  InputNumber,
  Upload,
  Input,
  Button,
  DatePicker,
  notification,
} from "antd";
// const { confirm } = Modal;
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import MUIDataTable from "mui-datatables";
import { getAllPratnerCandidate } from "../../../redux/action/candidate";
import axios, {
  // getAllCandidateMethode,
  getAllPratnerCandidateMethode,
} from "../../axios";
import moment from "moment";
// import { Link } from "react-router-dom";
const Candidate = (props) => {
  const User = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [addvisible, setAddvisible] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState({
    cname: "",
    cphone: "",
    cemail: "",
    cMSG: "",
    jobID: "",
    cDOB: "",
  });
  useEffect(() => {
    form.setFieldsValue(data);
  }, [form, data]);

  // const deleteResume = (id) => {
  //   deleteResumeDetails(id).then((val) => {
  //     if (val.data.status === 200) {
  //       getAllResume();
  //       console.log(val.data);
  //     }
  //   });
  // };
  // const showConfirm = (event, id) => {
  //   confirm({
  //     title: "Do you Want to delete these items?",
  //     // icon: <ExclamationCircleOutlined />,
  //     content: "Some descriptions",
  //     onOk() {
  //       deleteResume(id);
  //     },
  //     onCancel() {},
  //   });
  // };

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
    let obj = new FormData();
    obj.append("cname", values.cname);
    obj.append("cemail", values.cemail);
    obj.append("cphone", values.cphone);
    obj.append(
      "cDOB",
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(values.cDOB)
    );
    obj.append("mfile", values.mfile.file);
    obj.append("cMSG", values.cMSG);
    obj.append("createdBy", "webrixtec");
    obj.append("jobID", values.jobID);
    obj.append("userId", props.auth.id);
    handleCancel();
    axios
      .post(`/user/update-candidate?candidId=${updateId}`, obj)
      .then((res) => {
        if (res.data.status === 200) {
          // getAllCandidateMethode(props.getAllCandidate);
          var partner_name = JSON.parse(sessionStorage.getItem("pratner_name"));
          getAllPratnerCandidateMethode(props.getAllCandidate, partner_name);
          notification.success({
            message: res.data.message,
          });
        } else {
          notification.warn({
            message: res.data.message,
          });
        }
      });
  };
  const createhandleSubmit = (values) => {
    console.log(values);
    let obj = new FormData();
    obj.append("cname", values.cname);
    obj.append("cemail", values.cemail);
    obj.append("cphone", values.cphone);
    obj.append(
      "cDOB",
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(values.cDOB)
    );
    obj.append("mfile", values.mfile.file);
    obj.append("cMSG", values.cMSG);
    obj.append("createdBy", "webrixtec");
    obj.append("jobID", values.jobID);
    obj.append("userId", User.id);
    handleCancel();
    axios.post("/user/create-candidate", obj).then((res) => {
      if (res.data.status === 200) {
        getAllPratnerCandidateMethode(props.getAllCandidate, props.auth.name);
        notification.success({
          message: res.data.message,
        });
      } else {
        notification.warn({
          message: res.data.message,
        });
      }
    });
  };
  return (
    <>
      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form
          initialValues={data}
          {...layout}
          form={form}
          onFinish={handleSubmit}
        >
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
              format={"YYYY/MM/DD"}
            />
          </Form.Item>

          <Form.Item
            label="job ID"
            name="jobID"
            rules={[{ required: true, message: "Please input your JOB ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mfile"
            label="file Upload"
            rules={[{ required: true, message: "Please input your resume!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                return false;
              }}
            >
              <Button
              // icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Message"
            name={"cMSG"}
            rules={[{ required: true, message: "Please input your message!" }]}
          >
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
            label="job ID"
            name="jobID"
            rules={[{ required: true, message: "Please input your JOB ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mfile"
            label="file Upload"
            rules={[{ required: true, message: "Please input your resume!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                return false;
              }}
            >
              <Button
              // icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Message"
            rules={[
              { required: true, message: "Please input your message feild!" },
            ]}
            name={"cMSG"}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <MUIDataTable
        title={"Candidate List"}
        data={props.candidate.candidateList.filter((data) =>
          props.auth.adminToPartner
            ? data.user.name === props.auth.inPartnerData.name
            : data.user.name === User.name
        )}
        columns={[
          {
            label: "ID",
            name: "id",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Candidate Name",
            name: "cname",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Candidate Mobile",
            name: "cphone",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Candidate Email",
            name: "cemail",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Candidate DOB",
            name: "cdob",
            options: {
              filter: false,
              sort: true,
              customBodyRender: (value) => moment(value).format("YYYY/MM/DD"),
            },
          },
          {
            label: "Company",
            name: "user",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.name;
              },
            },
          },
          {
            label: "job ID",
            name: "jobID",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Resume",
            name: "imagUrl",
            options: {
              filter: false,
              sort: true,
              customBodyRender: (value) => {
                return (
                  // <Link to={value} target="_blank" download>
                  //   Download
                  // </Link>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    // download
                  >
                    Download
                  </a>
                );
              },
            },
          },
          {
            label: "message",
            name: "cmsg",
            options: {
              filter: false,
              sort: true,
            },
          },

          User.roles[0].rolename !== "ROLE_ADMIN"
            ? ""
            : {
                name: "Edit",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <>
                        <span>
                          {" "}
                          <i
                            style={{ fontSize: "22px" }}
                            className="mdi mdi-border-color cursor-pointer"
                            onClick={() => {
                              setData({
                                cname: tableMeta.rowData[1],
                                cphone: tableMeta.rowData[2],
                                cemail: tableMeta.rowData[3],
                                jobID: tableMeta.rowData[6],
                                cMSG: tableMeta.rowData[8],
                                cDOB: moment(tableMeta.rowData[4]),
                              });
                              setVisible(true);
                              setUpdateId(tableMeta.rowData[0]);
                            }}
                          ></i>
                        </span>
                        <span>
                          {/* {" "}
                          <i
                            style={{ fontSize: "22px" }}
                            className="mdi mdi-delete cursor-pointer"
                            onClick={() =>
                              showConfirm(true, tableMeta.rowData[0])
                            }
                          ></i> */}
                        </span>
                      </>
                    );
                  },
                },
              },
        ]}
        options={{
          selectableRows: false,
          responsive: "standard",
          viewColumns: false,
          customToolbar: () =>
            User.roles[0].rolename !== "ROLE_ADMIN" ? (
              <span>
                <i
                  style={{ fontSize: "19px", color: "#66696c" }}
                  className="mdi mdi mdi-account-plus cursor-pointer"
                  onClick={() => setAddvisible(true)}
                ></i>
              </span>
            ) : (
              ""
            ),
        }}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCandidate: (val) => dispatch(getAllPratnerCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
