import React from "react";

const TableHead = ({ customers }) => (
  <div className="table-head">
    <div className="table-cell" />
    {customers.map(customer => (
      <div className="table-cell" key={customer.name}>
        {customer.name}
      </div>
    ))}
  </div>
);

export default TableHead;
