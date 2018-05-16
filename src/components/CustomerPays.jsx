import React from "react";

const CustomerPays = ({ customerName, price }) => (
  <p>
    <b>{customerName}</b> pays R$ <b>{price.replace(".", ",")}</b>
  </p>
);

export default CustomerPays;
