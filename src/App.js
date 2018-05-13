import React, { Component } from "react";

import Row from "./components/Row";

import dataset from "./data";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <table>
          <tr>
            <th>Produto</th>
            {dataset.customers.map(customer => <th>{customer.name}</th>)}
          </tr>
          {dataset.items.map(product => <Row customers={dataset.customers} product={product} />)}
        </table>
      </div>
    );
  }
}

export default App;
