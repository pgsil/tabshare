import React, { Component } from "react";

import Row from "./components/Row";
import CustomerPays from "./components/CustomerPays";
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
        name: product.name,
        price: product.price,
        count: product.count,
        customers: []
      }))
    });
  }

  handleProductSelection({ customerName, productId }) {
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

    return allCustomers;
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <div className="table-head">
              <div className="table-cell">Produto</div>
              {dataset.customers.map(customer => (
                <div className="table-cell" key={customer.name}>
                  {customer.name}
                </div>
              ))}
            </div>
            {this.state.products.map(product => (
              <Row
                key={JSON.stringify(product)}
                customers={dataset.customers}
                product={product}
                handleChange={(...params) => this.handleProductSelection(...params)}
              />
            ))}
          </tbody>
        </table>

        <section className="customer-section">
          <h2>Price per customer:</h2>

          {this.getPricePerCustomer().map(item => (
            <CustomerPays key={item.name} customerName={item.name} price={item.paying.toFixed(2)} />
          ))}
        </section>

        <section className="tabtotals">
          <p>
            <b>
              Tab total: R${" "}
              {this.getTotalTabPrice()
                .toFixed(2)
                .replace(".", ",")}
            </b>
          </p>

          <p>
            <b>
              Accounted for: R${" "}
              {this.getPricePerCustomer()
                .reduce((acc, val) => acc + val.paying, 0)
                .toFixed(2)
                .replace(".", ",")}
            </b>
          </p>
        </section>

        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      </div>
    );
  }
}

export default App;
