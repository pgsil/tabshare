import React from "react";

const validColor = bool => (bool ? "black" : "#ffeb00");

const Row = ({ customers, product, handleChange }) => {
  return (
    <div className="table-row">
      <div className="table-cell" style={{ color: validColor(product.customers.length > 0) }}>
        {product.name}
      </div>
      {customers.map((customer, customerIndex) => {
        console.log(customer);
        return (
          <div className="table-cell" key={JSON.stringify(customer)}>
            <input
              className="customer-checkbox"
              type="checkbox"
              onChange={ev =>
                handleChange({
                  customerName: customer.name,
                  productId: product.id,
                  value: ev.target.checked
                })
              }
              checked={customer in product.customers}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Row;
