import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  //  Select,
  // Input,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import MUIDataTable from "mui-datatables";

import { connect } from "react-redux";
import { getAllCandidate } from "../../../redux/action/candidate";
import axios, { getAllCandidateMethode } from "../../axios";
import moment from "moment";
// const { confirm } = Modal;

const Index = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [data, setData] = useState({
    clientRef: "",
    annualCTC: "",
    offer_msg: "",
    joiningDate: "",
    offerDate: "",
  });
  // const [addvisible, setAddvisible] = useState(false);
  const [form] = Form.useForm();

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
  // const createhandleSubmit = (values) => {
  //   console.log(values);
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
        data={props.candidate.candidateList.filter(
          (data) => data.candidateStatus === "offergot"
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
              customBodyRender: (value) =>
                moment(value.offerDate).format("YYYY/MM/DD"),
            },
          },
          {
            label: "Joining Date",
            name: "offer",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) =>
                moment(value.joiningDate).format("YYYY/MM/DD"),
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
                return value.offer_msg;
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
                          setData({
                            clientRef: tableMeta.rowData[4].clientRef,
                            annualCTC: tableMeta.rowData[4].annualCTC,
                            offer_msg: tableMeta.rowData[4].offer_msg,
                            joiningDate: moment(
                              tableMeta.rowData[4].joiningDate
                            ),
                            offerDate: moment(tableMeta.rowData[4].offerDate),
                          });
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

      {/* ### update cadidate list */}

      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form
          {...layout}
          form={form}
          onFinish={handleSubmit}
          initialValues={data}
        >
          <h6>update list</h6>
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
                <DatePicker format={"YYYY/MM/DD"} />
              </Form.Item>

              <Form.Item
                label="Client Reffarele %"
                name="clientRef"
                // initialValue={data[4] ? data[4].clientRef : ""}
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
                // initialValue={data[4] ? data[4].annualCTC : ""}
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
                <DatePicker format={"YYYY/MM/DD"} />
              </Form.Item>
            </div>
            <Form.Item
              label="Message"
              // initialValue={data[4] ? data[4].offer_msg : ""}
              name={"offer_msg"}
            >
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
    getAllCandidate: (val) => dispatch(getAllCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
