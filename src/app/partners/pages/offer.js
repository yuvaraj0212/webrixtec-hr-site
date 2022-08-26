import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";
// import { deleteResumeDetails, getResume } from "../../axios";
import {
  Modal,
  Form,
  //  Select,
  // Input,
  DatePicker,
  InputNumber,
  notification,
} from "antd";

import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import axios, { getAllPratnerCandidateMethode } from "../../axios";
import { getAllPratnerCandidate } from "../../../redux/action/candidate";
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
    values.offer_id = updateId;
    console.log(values);
    axios.post("/admin/update-offer", values).then((res) => {
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
  //   setDates(values);
  // };
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
      <MUIDataTable
        title={"Offers"}
        data={props.candidate.candidateList.filter((data) =>
          props.auth.adminToPartner
            ? data.user.name === props.auth.inPartnerData.name &&
              data.candidateStatus === "offergot"
            : data.user.name === User.name &&
              data.candidateStatus === "offergot"
        )}
        columns={[
          { label: "ID", name: "id" },
          { label: "Candidate Name", name: "cname" },
          // { title: "Candidate Mobile", name: "phone" },
          { label: "Candidate Email", name: "cemail" },
          {
            label: "client Name",
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
            label: "Annual CTC",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.annualCTC;
              },
            },
          },
          {
            label: "offer Date",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.offerDate;
              },
            },
          },
          {
            label: "Joining Date",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.joiningDate;
              },
            },
          },
          {
            label: "client Refferal %",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => {
                return value.clientRef;
              },
            },
          },
          {
            label: "Message",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                console.log(tableMeta);
                return value.offer_msg;
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
                              setUpdateId(tableMeta.rowData[4].id);
                            }}
                          ></i>
                        </span>
                        {/* <span>
                        {" "}
                        <i
                          style={{ fontSize: "22px" }}
                          className="mdi mdi-delete cursor-pointer"
                          onClick={() => showConfirm(true, tableMeta.rowData[0])}
                        ></i>
                      </span> */}
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
          { title: "client Name", field: "company" },
          { title: "Annual CTC", field: "CTC" },
          { title: "Joining Date", field: "date" },
          { title: "client Refferal %", field: "companyRef" },
          { title: "Message", field: "Message" },
        ]}
        data={datas.filter((data) => data.company === partner.name)}
        // data={datas}
        title="OFFERS LIST"
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
                {
                  icon: "add",
                  tooltip: "Add User",
                  isFreeAction: true,
                  onClick: (event) => setAddvisible(true),
                },
              ]
        }
      /> */}
      {/* ### update cadidate list */}

      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <h6>Create list</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              {/* <Form.Item
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
              </Form.Item> */}

              <Form.Item
                label="Joining Date"
                name="joiningDate"
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
                name="clientRef"
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
              {/* <Form.Item
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
              </Form.Item> */}
              <Form.Item
                label="Annual CTC"
                name="annualCTC"
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
            </div>
            <Form.Item label="Message" name={"offer_msg"}>
              <TextArea rows={4} />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* ### create cadidate list */}

      {/* <Modal visible={addvisible} onOk={form.submit} onCancel={handleCancel}>
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
