import React from "react";

const Row = ({ customers, product, handleChange }) => (
  <tr>
    <td>{product.name}</td>
    {customers.map((customer, customerIndex) => (
      <td key={JSON.stringify(customer)}>
        <input
          type="checkbox"
          onChange={ev =>
            handleChange({
              customerName: customer.name,
              productId: product.id,
              value: ev.target.checked
            })
          }
        />
      </td>
    ))}
  </tr>
);

export default Row;
