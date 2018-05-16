import React from "react";

const validColor = bool => (bool ? "white" : "rgb(255, 41, 41)");

const Row = ({ customers, product, handleChange }) => {
  return (
    <div className="table-row">
      <div className="table-cell" style={{ color: validColor(product.customers.length > 0) }}>
        {product.name}
      </div>
      {customers.map((customer, customerIndex) => (
        <div className="table-cell" key={JSON.stringify(customer)}>
          <input
            id={customer.name + product.id}
            className="customer-checkbox"
            type="checkbox"
            onChange={ev =>
              handleChange({
                customerName: customer.name,
                productId: product.id,
                value: ev.target.checked
              })
            }
            checked={product.customers.includes(customer.name)}
          />
          <label className="checkbox-label" htmlFor={customer.name + product.id} />
        </div>
      ))}
    </div>
  );
};

export default Row;
