import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Select,
  notification,
  // ,Input
} from "antd";
// import TextArea from "antd/lib/input/TextArea";
import MUIDataTable from "mui-datatables";
import axios, { getAllCandidateMethode } from "../../axios";
import { connect } from "react-redux";
import { addCandidate, getAllCandidate } from "../../../redux/action/candidate";
// import TextArea from "antd/lib/input/TextArea";
// const { confirm } = Modal;

const Index = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();
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
    values.candidId = updateId;
    setVisible(false);
    axios.post("/admin/update-yettostart", values).then((res) => {
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
            name="status"
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

          {/* <Form.Item
            label="Message"
            rules={[
              { required: true, message: "Please input your Status message!" },
            ]}
            name={"msg"}
          >
            <TextArea rows={4} />
          </Form.Item> */}
        </Form>
      </Modal>

      <MUIDataTable
        title={"Yet to Start"}
        data={props.candidate.candidateList.filter(
          (data) => data.candidateStatus === null
        )}
        columns={[
          { label: "ID", name: "id" },
          { label: "Candidate Name", name: "cname" },
          // { title: "Candidate Mobile", name: "phone" },
          { label: "Candidate Email", name: "cemail" },
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
            label: "Track Status",
            name: "trackstatus",
            options: {
              filter: false,
              sort: true,
              empty: true,
              customBodyRender: (value, tableMeta) => (
                <p
                  // type="button"
                  // className="btn btn-primary btn-fw btn-sm"
                  className="text-primary"
                >
                  yet to start
                </p>
              ),
            },
          },
          // { title: "Message", name: "candidateStatusMsg" },
          {
            label: "Action",
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
                          setVisible(true);
                          setUpdateId(tableMeta.rowData[0]);
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
