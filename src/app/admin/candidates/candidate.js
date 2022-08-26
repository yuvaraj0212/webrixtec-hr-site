import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Form,
  InputNumber,
  Upload,
  Input,
  Button,
  DatePicker,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import MUIDataTable from "mui-datatables";
import axios, { getAllCandidateMethode } from "../../axios";
import { addCandidate, getAllCandidate } from "../../../redux/action/candidate";
const { confirm } = Modal;

const Candidate = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [data, setData] = useState([]);
  const [addvisible, setAddvisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    console.log("render");
  }, [data]);

  const showConfirm = (event, id) => {
    confirm({
      title: "Do you Want to delete these items?",
      // icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        axios.delete(`admin/del/candidates?Id=${id}`).then((res) => {
          if (res.data.status === 200) {
            getAllCandidateMethode(props.getAllCandidate);
            notification.success({
              message: res.data.message,
            });
          } else {
            notification.warn({
              message: res.data.message,
            });
          }
        });
      },
      onCancel() {},
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
    setData([]);
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
    obj.append("mfile", values.mfile.file.originFileObj);
    obj.append("cMSG", values.cMSG);
    obj.append("createdBy", "webrixtec");
    obj.append("jobID", values.jobID);
    obj.append("userId", props.auth.id);
    handleCancel();
    axios
      .post(`/user/update-candidate?candidId=${updateId}`, obj)
      .then((res) => {
        if (res.data.status === 200) {
          getAllCandidateMethode(props.getAllCandidate);
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
    obj.append("mfile", values.mfile.file.originFileObj);
    obj.append("cMSG", values.cMSG);
    obj.append("createdBy", "webrixtec");
    obj.append("jobID", values.jobID);
    obj.append("userId", props.auth.id);
    handleCancel();
    axios.post("/user/create-candidate", obj).then((res) => {
      if (res.data.status === 200) {
        getAllCandidateMethode(props.getAllCandidate);
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
  console.log(data);
  return (
    <>
      {visible && data ? (
        <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
          <Form {...layout} form={form} onFinish={handleSubmit}>
            <h6>Update Candidate</h6>

            <Form.Item
              label="Candidate Name"
              name="cname"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              initialValue={data[1]}
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
              initialValue={data[3]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mobile"
              name="cphone"
              rules={[{ required: true, message: "Please input your mobile!" }]}
              initialValue={data[2]}
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
              // initialValue={moment().get(data[4])}
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
              initialValue={data[6]}
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

            <Form.Item
              label="Message"
              name={"cMSG"}
              initialValue={data[8]}
              rules={[
                { required: true, message: "Please input your Messsage!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        ""
      )}
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

          {/* <Form.Item
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
          </Form.Item> */}

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

      <MUIDataTable
        title={"Candidate List"}
        data={props.candidate.candidateList}
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
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
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
          {
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
                          console.log(tableMeta.rowData);
                          setData(tableMeta.rowData);
                          setUpdateId(tableMeta.rowData[0]);
                          console.log(data);
                          setVisible(true);
                        }}
                      ></i>
                    </span>
                    <span>
                      {" "}
                      <i
                        style={{ fontSize: "22px" }}
                        className="mdi mdi-delete cursor-pointer"
                        onClick={() => showConfirm(true, tableMeta.rowData[0])}
                      ></i>
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
          customToolbar: () => (
            <span>
              <i
                style={{ fontSize: "19px", color: "#66696c" }}
                className="mdi mdi mdi-account-plus cursor-pointer"
                onClick={() => setAddvisible(true)}
              ></i>
            </span>
          ),
        }}
      />

      {/* <MaterialTable
        options={{
          exportButton: {
            csv: true,
            // pdf: true,
          },
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#a7a7a7",
            color: "#FFF",
          },
          // filtering: true,
        }}
        columns={[
          { title: "ID", field: "id" },
          { title: "Candidate Name", field: "name" },
          {
            title: "Candidate Mobile",
            field: "phone",
          },
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
      /> */}
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
    addCandid: (data) => dispatch(addCandidate(data)),
    getAllCandidate: (val) => dispatch(getAllCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
