import React from "react";

const CustomerPays = ({ customerName, price }) => (
  <p>
    {customerName} pays R$ {price}
  </p>
);

export default CustomerPays;
