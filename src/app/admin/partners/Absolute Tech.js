import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getResume, deleteResumeDetails } from "../../axios";
import { Modal } from "antd";

const { confirm } = Modal;

const AbsoluteTech = () => {
  const [datas, setDates] = useState([]);

  useEffect(() => {
    getAllResume();
  }, []);

  const deleteResume = (id) => {
    deleteResumeDetails(id).then((val) => {
      if (val.data.status === 200) {
        getAllResume();
        console.log(val.data);
      }
    });
  };
  const showConfirm = (event, id) => {
    confirm({
      title: "Do you Want to delete these items?",
      // icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        deleteResume(id);
      },
      onCancel() {},
    });
  };
  const getAllResume = () => {
    getResume().then((val) => {
      if (val.data.status === 200) {
        setDates(val.data.result);
      }
    });
  };
  return (
    <>
      <MaterialTable
        options={{
          exportButton: {
            csv: true,
            // pdf: true,
          },
          actionsColumnIndex: -1,
        }}
        columns={[
          { title: "ID", field: "id" },
          { title: "Candidate Name", field: "name" },
          { title: "Candidate Mobile", field: "phone" },
          { title: "Candidate Email", field: "email" },
          { title: "Company", field: "company" },
          { title: "Date", field: "date" },
          {
            title: "File",
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
        ]}
        data={datas.filter((data) => data.company === "Absolute Tech")}
        // data={this.state.datas}
        title="Admin Dashboard "
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => showConfirm(event, rowData.id),
          },
        ]}
      />
    </>
  );
};

export default AbsoluteTech;
