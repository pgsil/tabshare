import React from "react";

const Row = ({ customers, product }) => (
  <tr>
    <td>{product.name}</td>
    {customers.map(customer => (
      <td>
        <input type="checkbox" />
      </td>
    ))}
  </tr>
);

export default Row;
