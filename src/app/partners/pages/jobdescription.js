import React, { useEffect, useState } from "react";
// import { deleteResumeDetails, getResume } from "../../axios";
import json from "../../admin/jobdescription/datas.json";
import { Modal, Form, Input } from "antd";
import MUIDataTable from "mui-datatables";
import Table from "../../admin/jobdescription/table";
// const { confirm } = Modal;

const Index = () => {
  const [datas, setDates] = useState([]);

  const [morevisible, setMorevisible] = useState({ state: false, data: [] });
  const [visible, setVisible] = useState(false);
  const [addvisible, setAddvisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllResume();
  }, []);

  //   const deleteResume = (id) => {
  //     deleteResumeDetails(id).then((val) => {
  //       if (val.data.status === 200) {
  //         getAllResume();
  //         console.log(val.data);
  //       }
  //     });
  //   };
  //   const showConfirm = (event, id) => {
  //     confirm({
  //       title: "Do you Want to delete these items?",
  //       // icon: <ExclamationCircleOutlined />,
  //       content: "Some descriptions",
  //       onOk() {
  //         deleteResume(id);
  //       },
  //       onCancel() {},
  //     });
  //   };
  // const showDetails = (event, value) => {
  //   confirm({
  //     title: "Do you Want to delete these items?",
  //     // icon: <ExclamationCircleOutlined />,
  //     content: "Some descriptions",
  //     onOk() {},
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
  console.log(datas);
  const handleCancel = () => {
    setVisible(false);
    setAddvisible(false);

    form.resetFields();
  };
  const handleSubmit = (values) => {
    console.log(values);
    setDates(values);
  };
  const createhandleSubmit = (values) => {
    console.log(values);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };
  const { data, state } = morevisible;
  return (
    <>
      <MUIDataTable
        title={"job description"}
        data={json}
        columns={[
          // { label: "SI.No", name: "id" },
          // { label: "Position/HNO", name: "hno" },
          // { label: "Industry", name: "industry" },
          // { label: "Position Type", name: "type" },
          // { label: "Contract Details", name: "contract" },
          // { label: "Requirements", name: "requirements" },
          // { label: "Job Description", name: "jobDescription" },
          // { label: "Langugae", name: "lang" },
          // { label: "Minimum Salary", name: "minSlary" },
          // { label: "Maximum Salary", name: "maxSlary" },
          // { label: "Location", name: "location" },
          // { label: "japanees", name: "jp" },
          // { label: "Residing", name: "residing" },
          // { label: "Positions", name: "positions" },
          {
            name: "SI.No",
            options: {
              customBodyRender: (value, tableMeta, updateValue) =>
                tableMeta.rowIndex + 1,
            },
          },
          { name: "Position/HNO" },
          { name: "Industry" },
          { name: "Position Type" },
          {
            name: "Contract details",
          },
          {
            name: "Requirements",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                <td
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {value}
                </td>
              ),
            },
          },
          {
            name: "Job Description",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                <td
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {value}
                </td>
              ),
            },
          },
          { name: "Langugae" },
          { name: "Minimum Salary" },
          { name: "Maximum Salary" },
          { name: "Location" },
          { name: "japanees" },
          { name: "Residing" },
          { name: "Positions" },
          //   {
          //     name: "Edit",
          //     options: {
          //       filter: false,
          //       sort: false,
          //       empty: true,
          //       customBodyRender: (value, tableMeta, updateValue) => {
          //         return (
          //           <>
          //             <span>
          //               {" "}
          //               <i
          //                 style={{ fontSize: "22px" }}
          //                 className="mdi mdi-border-color cursor-pointer"
          //                 onClick={() => setVisible(true)}
          //               ></i>
          //             </span>
          //             <span>
          //               {" "}
          //               <i
          //                 style={{ fontSize: "22px" }}
          //                 className="mdi mdi-delete cursor-pointer"
          //                 onClick={() => showConfirm(true, tableMeta.rowData[0])}
          //               ></i>
          //             </span>
          //           </>
          //         );
          //       },
          //     },
          //   },
        ]}
        options={{
          selectableRows: false,
          onRowClick: (rowData, rowMeta) => {
            setMorevisible({ state: true, data: rowData });
          },
          responsive: "standard",
          viewColumns: false,
          filter: false,
          //   customToolbar: () => (
          //     <span>
          //       <i
          //         style={{ fontSize: "19px", color: "#66696c" }}
          //         className="mdi mdi mdi-account-plus cursor-pointer"
          //         onClick={() => setAddvisible(true)}
          //       ></i>
          //     </span>
          //   ),
        }}
      />
      {/* row details */}
      <Modal
        title="Details"
        visible={state}
        style={{ height: "70vh", overflow: "auto" }}
        footer={null}
        width={1250}
        onCancel={() => setMorevisible({ state: false })}
      >
        {data && <Table props={data} />}
        {/* {data && (
          <div className="row">
            <div className="col-md-6">
              <p>
                <b>Position/HNO :</b>
                {data[1]}
              </p>
              <p>
                <b>Position Type :</b>
                {data[3]}
              </p>
              <p>
                <b>Langugae :</b>
                {data[7]}
              </p>
              <p>
                <b>Location :</b>
                {data[10]}
              </p>
              <p>
                <b>Japanees :</b>
                {data[11]}
              </p>
              <p>
                <b>Residing :</b>
                {data[12]}
              </p>
              <p>
                <b>Requirements:</b>
                <br />
                {data[5] ? data[5].props.children : ""}
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <b>Industry :</b>
                {data[2]}
              </p>

              <p>
                <b>contract Details:</b>
                {data[4]}
              </p>
              <p>
                <b>Minimum Salary:</b>
                {data[8]}
              </p>
              <p>
                <b>Maximum Salary :</b>
                {data[9]}
              </p>
              <p>
                <b>Position :</b>
                {data[13]}
              </p>
              <p>
                <b>Job Description:</b>
                <br />
                {data[6] ? data[6].props.children : ""}
              </p>
            </div>
          </div>
        )} */}
      </Modal>

      {/* ### update cadidate list */}

      <Modal
        visible={visible}
        title="Update"
        width="75%"
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} onFinish={handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-12">
              <Form.Item
                label="Position/HNO"
                name="hno"
                rules={[
                  {
                    required: true,
                    message: "Please input your Position/HNO!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Industry"
                name="industry"
                rules={[
                  {
                    required: true,
                    message: "Please input your industry!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Position Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input your Position Type!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Contract Details"
                name="contract"
                rules={[{ required: true, message: "Please input contract" }]}
              >
                {/* <InputNumber
                  style={{
                    width: "100%",
                  }}
                /> */}
                <Input />
              </Form.Item>

              <Form.Item
                label="Job Description"
                name="jobDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input your jobDescription !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Langugae"
                name="lang"
                rules={[
                  {
                    required: true,
                    message: "Please input your Annual Langugae!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Requirements"
                name="requirements"
                rules={[
                  {
                    required: true,
                    message: "Please input your requirements",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-12">
              <Form.Item
                label="Minimum Salary"
                name="minSlary"
                rules={[
                  {
                    required: true,
                    message: "Please input your Minimum Salary!",
                  },
                ]}
              >
                {/* <DatePicker /> */}
                <Input />
              </Form.Item>
              <Form.Item
                label="Maximum Salary"
                name="maxSlary"
                rules={[
                  {
                    required: true,
                    message: "Please input your Maximum Salary!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="japanees"
                name="jp"
                rules={[
                  {
                    required: true,
                    message: "Please input your japanees!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Residing"
                name="residing"
                rules={[
                  {
                    required: true,
                    message: "Please input your Residing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Positions"
                name="positions"
                rules={[
                  {
                    required: true,
                    message: "Please input your positions!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>

      {/* ### create cadidate list */}

      <Modal
        visible={addvisible}
        title="Create"
        width="75%"
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} onFinish={createhandleSubmit}>
          <h6>Create list</h6>
          <div className="row">
            <div className="col-md-6 col-12">
              <Form.Item
                label="Position/HNO"
                name="hno"
                rules={[
                  {
                    required: true,
                    message: "Please input your Position/HNO!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Industry"
                name="industry"
                rules={[
                  {
                    required: true,
                    message: "Please input your industry!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Position Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input your Position Type!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Contract Details"
                name="contract"
                rules={[{ required: true, message: "Please input contract" }]}
              >
                {/* <InputNumber
                  style={{
                    width: "100%",
                  }}
                /> */}
                <Input />
              </Form.Item>

              <Form.Item
                label="Job Description"
                name="jobDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input your jobDescription !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Langugae"
                name="lang"
                rules={[
                  {
                    required: true,
                    message: "Please input your Annual Langugae!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Requirements"
                name="requirements"
                rules={[
                  {
                    required: true,
                    message: "Please input your requirements",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-12">
              <Form.Item
                label="Minimum Salary"
                name="minSlary"
                rules={[
                  {
                    required: true,
                    message: "Please input your Minimum Salary!",
                  },
                ]}
              >
                {/* <DatePicker /> */}
                <Input />
              </Form.Item>
              <Form.Item
                label="Maximum Salary"
                name="maxSlary"
                rules={[
                  {
                    required: true,
                    message: "Please input your Maximum Salary!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="japanees"
                name="jp"
                rules={[
                  {
                    required: true,
                    message: "Please input your japanees!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Residing"
                name="residing"
                rules={[
                  {
                    required: true,
                    message: "Please input your Residing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Positions"
                name="positions"
                rules={[
                  {
                    required: true,
                    message: "Please input your positions!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
