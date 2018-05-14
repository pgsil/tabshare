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
      products: dataset.items.map(product => ({
        id: product.id,
        price: product.price,
        count: product.count,
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

    this.state.products.forEach(product =>
      product.customers.forEach(customer => {
        if (customer.checked) {
          const custIndex = customers.findIndex(item => item.name === customer.name);

          console.log("customers[custIndex]", customers[custIndex]);
          console.log("product", product);
          customers[custIndex].paying = customers[custIndex].paying + product.price;
        }
      })
    );

    console.log(customers);
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

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
