import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";
// import { deleteResumeDetails, getResume } from "../../axios";
import { Modal, Form, Select, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import axios, { getAllPratnerCandidateMethode } from "../../axios";
import { getAllPratnerCandidate } from "../../../redux/action/candidate";
// const { confirm } = Modal;
const Index = (props) => {
  const User = useSelector((state) => state.auth);
  const [updateId, setUpdateId] = useState();
  const [visible, setVisible] = useState(false);
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
    values.dup_id = updateId;
    axios.post("/admin/update-duplication", values).then((res) => {
      if (res.data.status === 200) {
        setVisible(false);
        form.resetFields();
        var partner_name = JSON.parse(sessionStorage.getItem("pratner_name"));
        getAllPratnerCandidateMethode(props.getAllCandidate, partner_name);
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
            label="Status"
            name="duplication_status"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value="clieantDuplication">
                Client Duplication
              </Select.Option>
              <Select.Option value="vendorDuplication">
                Vendor Duplication
              </Select.Option>
              <Select.Option value="inhouseDuplication">
                Inhouse Duplication
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Message" name={"duplication_msg"}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
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
            label="Status"
            name="DuplicationStatus"
            required
            tooltip="This is a required field"
          >
            <Select size={"large"} placeholder="Please select ">
              <Select.Option value="clieantDuplication">
                Client Duplication
              </Select.Option>
              <Select.Option value="vendorDuplicationed">
                Vendor Duplication
              </Select.Option>
              <Select.Option value="inhouseDuplication">
                Inhouse Duplication
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Message" name={"DuplicationMessage"}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal> */}
      <MUIDataTable
        title={"DUPLICATION"}
        data={props.candidate.candidateList.filter((data) =>
          props.auth.adminToPartner
            ? data.user.name === props.auth.inPartnerData.name &&
              data.candidateStatus === "duplication"
            : data.user.name === User.name &&
              data.candidateStatus === "duplication"
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
            label: "Candidate Email",
            name: "cemail",
            options: {
              filter: false,
              sort: true,
            },
          },
          {
            label: "Client Name",
            name: "user",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                return value.name;
              },
            },
          },
          {
            label: "Status",
            name: "duplication",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                return value.duplication_status;
              },
            },
          },
          {
            label: "Message",
            name: "duplication",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta) => {
                return value.duplication_msg;
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
          { title: "Clieant Name", field: "company" },
          { title: "Status", field: "DuplicationStatus" },
          { title: "Message", field: "DuplicationMessage" },
        ]}
        data={datas.filter((data) => data.company === partner.name)}
        // data={datas}
        title="DUPLICATION LIST"
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
              ]
        }
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
    getAllCandidate: (val) => dispatch(getAllPratnerCandidate(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
