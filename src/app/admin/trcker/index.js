import React, { useEffect, useState } from "react";
import { Modal, Form, Select, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { getAllCandidate } from "../../../redux/action/candidate";
import axios, { getAllCandidateMethode } from "../../axios";
// const { confirm } = Modal;

const Index = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    trackStaus: "",
    track_msg: "",
  });

  useEffect(() => {
    form.setFieldsValue(data);
  }, [form, data]);

  // const deleteResume = (id) => {
  // deleteResumeDetails(id).then((val) => {
  //   if (val.data.status === 200) {
  //     getAllResume();
  //     console.log(val.data);
  //   }
  // });
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

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    values.tracker_id = updateId;
    console.log(values);
    axios.post("/admin/update-tracker", values).then((res) => {
      if (res.data.status === 200) {
        console.log(res);
        setVisible(false);
        form.resetFields();
        getAllCandidateMethode(props.getAllCandidate);
        notification.success({
          message: res.data.message,
        });
      } else {
        setVisible(false);
        notification.warn({
          message: res.data.message,
        });
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
  return (
    <>
      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form
          {...layout}
          form={form}
          onFinish={handleSubmit}
          initialValues={data}
        >
          <h6>Update list</h6>

          {/* <Form.Item
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
          </Form.Item> */}
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

          {/* <Form.Item
            label="client Name"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Track Status"
            name="trackStaus"
            rules={[{ required: true, message: "Please input your Status!" }]}
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value={null}>Yet To Start</Select.Option>
              <Select.Option value="processing">Processing</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="duplication">Duplication</Select.Option>
              <Select.Option value="offergot">Offer Got</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Message"
            rules={[
              { required: true, message: "Please input your Status message!" },
            ]}
            name={"track_msg"}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <MUIDataTable
        title={"TRACKER"}
        data={props.candidate.candidateList.filter(
          (data) => data.candidateStatus !== null
        )}
        columns={[
          { label: "ID", name: "id" },
          { label: "Candidate Name", name: "cname" },
          // { title: "Candidate Mobile", name: "phone" },
          { label: "Candidate Email", name: "cemail" },
          {
            label: "Client Name",
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
            label: "Track Status",
            name: "candidateStatus",
            options: {
              filter: false,
              sort: true,
              empty: true,
              customBodyRender: (x, tableMeta) => {
                switch (x) {
                  case "offergot":
                    return (
                      <p>
                        <i className="icon mdi mdi-wallet-travel text-primary ml-auto">
                          offergot
                        </i>
                      </p>
                    );
                  case "processing":
                    return (
                      <p>
                        <i className="icon mdi mdi-cached text-success ml-auto">
                          Processing
                        </i>
                      </p>
                    );
                  case "rejected":
                    return (
                      <p>
                        <i className="icon mdi mdi-close text-danger ml-auto">
                          Rejected
                        </i>
                      </p>
                    );
                  case "duplication":
                    return (
                      <p>
                        <i className="icon mdi mdi-block-helper text-danger ml-auto">
                          Duplication
                        </i>
                      </p>
                    );
                  default:
                    return (
                      <p
                        // type="button"
                        // className="btn btn-primary btn-fw btn-sm"
                        className="text-primary"
                      >
                        yet to start
                      </p>
                    );
                }
              },
            },
          },
          {
            label: "Message",
            name: "candidateStatusMsg",
            // options: {
            //   filter: true,
            //   sort: true,
            //   customBodyRender: (value, tableMeta) => {
            //     console.log(tableMeta);
            //     return value.track_msg;
            //   },
            // },
          },
          {
            label: "action",
            name: "edite",
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
                            trackStaus: tableMeta.rowData[4],
                            track_msg: tableMeta.rowData[5],
                          });
                          setVisible(true);
                          setUpdateId(tableMeta.rowData[0]);
                        }}
                      ></i>
                    </span>
                    <span>
                      {" "}
                      {/* <i
                        style={{ fontSize: "22px" }}
                        className="mdi mdi-delete cursor-pointer"
                        onClick={() => showConfirm(true, tableMeta.rowData[0])}
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
          filter: false,
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
        }}
        columns={[
          { title: "ID", field: "id" },
          { title: "Candidate Name", field: "name" },
          // { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "Client Name", field: "company" },
          {
            title: "Track Status",
            field: "trackstatus",
            render: (rowData) => {
              let a = String(rowData.id).slice(-1);
              let x;
              if (a === "1" || a === "3" || a === "7") {
                x = 1;
              } else if (a === "2" || a === "4") {
                x = 2;
              } else if (a === "8" || a === "6") {
                x = 3;
              } else if (a === "9" || a === "5") {
                x = 4;
              }

              switch (x) {
                case 1:
                  return (
                    <p>
                      <i className="icon mdi mdi-wallet-travel text-primary ml-auto">
                        offergot
                      </i>
                    </p>
                  );
                case 2:
                  return (
                    <p>
                      <i className="icon mdi mdi-cached text-success ml-auto">
                        Processing
                      </i>
                    </p>
                  );
                case 3:
                  return (
                    <p>
                      <i className="icon mdi mdi-close text-danger ml-auto">
                        Rejected
                      </i>
                    </p>
                  );
                case 4:
                  return (
                    <p>
                      <i className="icon mdi mdi-block-helper text-danger ml-auto">
                        {" "}
                        Duplication
                      </i>
                    </p>
                  );
                default:
                  return (
                    <p
                      // type="button"
                      // className="btn btn-primary btn-fw btn-sm"
                      className="text-primary"
                    >
                      yet to start
                    </p>
                  );
              }
            },
          },
          { title: "Message", field: "trackMessage" },
        ]}
        // data={datas.filter((data) => data.company === "Absolute Tech")}
        data={datas}
        title="TRACKER"
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
    getAllCandidate: (val) => dispatch(getAllCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
