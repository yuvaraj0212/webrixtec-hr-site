import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";
// import { getResume, deleteResumeDetails } from "../../axios";
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
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    getAllResume();
  }, []);

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
  const getAllResume = () => {
    // getResume().then((val) => {
    //   if (val.data.status === 200) {
    //     setDates(val.data.result);
    //   }
    // });
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    values.rejected_id = updateId;
    setVisible(false);
    axios.post("/admin/update-rejected", values).then((res) => {
      if (res.data.status === 200) {
        form.resetFields();
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
      <MUIDataTable
        title={"REJECTED"}
        data={props.candidate.candidateList.filter(
          (data) => data.candidateStatus === "rejected"
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
            label: "Round Of Rejected",
            name: "rejected",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                return value.rof;
              },
            },
          },
          {
            label: "Message",
            name: "rejected",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.rejected_msg;
              },
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
                          setVisible(true);
                          setUpdateId(tableMeta.rowData[4].id);
                        }}
                      ></i>
                    </span>
                    <span>
                      {/* {" "}
                      <i
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
          { title: "Round Of Rejected", field: "ROf" },
          { title: "Message", field: "message" },
        ]}
        // data={datas.filter((data) => data.company === "Absolute Tech")}
        data={datas}
        title="REJECTED"
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
      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={handleSubmit}>
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
          </Form.Item>

          <Form.Item
            label="client Name"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Round Of Rejected"
            name="rof"
            initialValue={data[4] ? data[4].rof : ""}
            rules={[
              { required: true, message: "Please select Round Of Rejected!" },
            ]}
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value="resumeShortlist">
                Resume shortlist
              </Select.Option>
              <Select.Option value="firstRonund">First Round</Select.Option>
              <Select.Option value="language">Language</Select.Option>
              <Select.Option value="technicalRound">
                Technical Round
              </Select.Option>
              <Select.Option value="finalRound">Final Round</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Message"
            initialValue={data[4] ? data[4].rejected_msg : ""}
            rules={[{ required: true, message: "Please input your message!" }]}
            name={"rejected_msg"}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
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
