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
        customers: []
      }))
    });
  }

  handleProductSelection({ customerName, productId, value }) {
    const newProductsState = [...this.state.products];

    const tgtProductIndex = newProductsState.findIndex(product => product.id === productId);

    const tgtCustomerIndex = newProductsState[tgtProductIndex].customers.indexOf(customerName);

    const customers = newProductsState[tgtProductIndex].customers;

    if (tgtCustomerIndex >= 0) {
      customers.splice(tgtCustomerIndex, 1);
    } else {
      customers.push(customerName);
    }

    this.setState({ products: newProductsState });
  }

  getTotalTabPrice() {
    const price = dataset.items.reduce((acc, val) => {
      return acc + val.price * val.count;
    }, 0);

    return price;
  }

  getPricePerCustomer() {
    const allCustomers = dataset.customers.map(customer => ({ name: customer.name, paying: 0 }));

    this.state.products.forEach(product =>
      product.customers.forEach(customer => {
        const custIndex = allCustomers.findIndex(item => item.name === customer);

        allCustomers[custIndex].paying += product.price * product.count / product.customers.length;
      })
    );

    return JSON.stringify(allCustomers, null, 0);
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
        <pre>PPC: {this.getPricePerCustomer()}</pre>

        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      </div>
    );
  }
}

export default App;
