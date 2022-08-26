import React from "react";

const Table = ({ props }) => {
  console.log(props);
  const css = {
    background: "#fdc134",
    padding: "2px",
    marginRight: "4px",
  };
  return (
    <table class="table table-bordered ">
      <tbody>
        <tr>
          <th scope="row">
            <span style={css}></span>
            SI.No
          </th>
          <td>{props[0]}</td>
          <th scope="row">
            <span style={css}></span>Position
          </th>
          <td> {props[13]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Position/HNO
          </th>
          <td>{props[1]}</td>
          <th scope="row">
            <span style={css}></span>Industry
          </th>
          <td>{props[2]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Position Type
          </th>
          <td>{props[3]}</td>
          <th scope="row">
            <span style={css}></span>contract Details
          </th>
          <td>{props[4]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Location
          </th>
          <td>{props[10]}</td>
          <th scope="row">
            <span style={css}></span>Langugae
          </th>
          <td> {props[7]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Maximum Salary
          </th>
          <td>{props[9]}</td>
          <th scope="row">
            <span style={css}></span>Minimum Salary
          </th>
          <td>{props[8]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Job Description
          </th>
          <td colSpan={3}>{props[6] ? props[6].props.children : ""}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Japanees
          </th>
          <td>{props[11]}</td>
          <th scope="row">
            <span style={css}></span>Residing
          </th>
          <td>{props[12]}</td>
        </tr>
        <tr>
          <th scope="row">
            <span style={css}></span>Requirements
          </th>
          <td colSpan={3}>{props[5] ? props[5].props.children : ""}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
