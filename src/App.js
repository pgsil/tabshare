import React, { Component } from "react";

import Row from "./components/Row";
import dataset from "./data";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      products: []
    };
  }

  componentDidMount() {
    this.setState({
      // customers: dataset.customers.map(customer => ({ name: customer.name, products: [] })),
      products: dataset.items.map(product => ({
        id: product.id,
        customers: dataset.customers.map(customer => ({ name: customer.name, checked: false }))
      }))
    });
  }

  handleProductSelection({ customerName, productId, value }) {
    const newProductsState = [...this.state.products];

    const tgtProductIndex = newProductsState.findIndex(product => product.id === productId);

    const tgtCustomerIndex = newProductsState[tgtProductIndex].customers.findIndex(
      customer => customer.name === customerName
    );

    const tgtCustomer = newProductsState[tgtProductIndex].customers[tgtCustomerIndex];

    tgtCustomer.checked = value;

    this.setState({ products: newProductsState });
  }

  getTotalTabPrice() {
    const price = dataset.items.reduce((acc, val) => {
      return acc + val.price * val.count;
    }, 0);

    return price;
  }

  getPricePerCustomer() {
    const customers = dataset.customers.map(customer => ({ name: customer.name, paying: 0 }));

    // TODO
    this.state.products.forEach(product => )
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <th>Produto</th>
              {dataset.customers.map(customer => <th key={customer.name}>{customer.name}</th>)}
            </tr>
            {dataset.items.map(product => (
              <Row
                key={JSON.stringify(product)}
                customers={dataset.customers}
                product={product}
                handleChange={(...params) => this.handleProductSelection(...params)}
              />
            ))}
          </tbody>
        </table>

        <p>Tab total: {this.getTotalTabPrice()}</p>
        <p>PPC: {this.getPricePerCustomer()}</p>

        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default App;
