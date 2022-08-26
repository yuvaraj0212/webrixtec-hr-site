import React, { useEffect, useState } from "react";
import { getAllPratnerCandidate } from "../../../redux/action/candidate";

import { connect } from "react-redux";
import {
  Modal,
  Form,
  //  Select,
  Input,
  DatePicker,
  notification,
} from "antd";

import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import axios, { getAllPratnerCandidateMethode } from "../../axios";
// const { confirm } = Modal;
const Index = (props) => {
  const User = useSelector((state) => state.auth);
  const [updateId, setUpdateId] = useState();
  const [visible, setVisible] = useState(false);
  // const [addvisible, setAddvisible] = useState(false);
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
    // setAddvisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    values.process_id = updateId;
    console.log(values);
    axios.post("/admin/update-processing", values).then((res) => {
      if (res.data.status === 200) {
        console.log(res);
        setVisible(false);
        form.resetFields();
        getAllPratnerCandidateMethode(props.getAllCandidate, props.auth.name);
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
      <MUIDataTable
        title={"PROCESSING"}
        data={props.candidate.candidateList.filter((data) =>
          props.auth.adminToPartner
            ? data.user.name === props.auth.inPartnerData.name &&
              data.candidateStatus === "processing"
            : data.user.name === User.name &&
              data.candidateStatus === "processing"
        )}
        columns={[
          { label: "S.No", name: "id" },
          { label: "Candidate Name", name: "cname" },
          // { title: "Candidate Mobile", name: "phone" },
          { title: "Candidate Email", name: "cemail" },
          {
            label: "Technology",
            name: "processing",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.technolgy;
              },
            },
          },
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
            label: "Start Date",
            name: "processing",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.startDate;
              },
            },
          },
          {
            label: "Interview Status",
            name: "processing",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                console.log(tableMeta);
                return value.procesingStatus;
              },
            },
          },
          {
            label: "Budget",
            name: "processing",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                console.log(tableMeta);
                return value.budjet;
              },
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
                    console.log(tableMeta.rowData[0]);
                    return (
                      <>
                        <span>
                          {" "}
                          <i
                            style={{ fontSize: "22px" }}
                            className="mdi mdi-border-color cursor-pointer"
                            onClick={() => {
                              setVisible(true);
                              setUpdateId(tableMeta.rowData[5].id);
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
      /> */}
      {/* ### update cadidate list */}

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
          </Form.Item> */}

          <Form.Item
            label="Technology"
            name="tech"
            rules={[
              { required: true, message: "Please input your technology!" },
            ]}
          >
            <Input />
          </Form.Item>

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
            label="Start Dtae"
            name="date"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Interview Status"
            name="procesingStatus"
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
