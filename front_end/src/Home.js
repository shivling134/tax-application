import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        id: "",
        name: "",
        rate: "",
        quantity: "",
        discount: "",
        tax: "",
        records: [],
        showAlert: false,
        alertMsg: "",
        sum: 0,
        alertType: "success",
        update: false,
        regexp: /^[0-9\b]+$/,
      };
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.id === "" || this.state.regexp.test(this.state.id)) {
      this.setState({ id: e.target.value });
    }
  };

  componentDidMount() {
    this.fetchAllRecords();
  }

  // add a record
  addRecord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
      id: this.state.id,
      name: this.state.name,
      rate: this.state.rate,
    });
    fetch("http://localhost:8000/api/create", {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          id: "",
          name: "",
          rate: "",
          quantity: "",
          discount: "",
          tax: "",
          showAlert: true,
          alertMsg: result.response,
          alertType: "success",
        });
      });
  };

  // fetch All Records
  fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:8000/api/view", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        this.setState({
          records: result.response,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // sum all record
  fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:8000/api/view", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        this.setState({
          records: result.response,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // view single data to edit
  editRecord = (id) => {
    fetch("http://localhost:8000/api/view/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          id: result.response[0].id,
          update: true,
          name: result.response[0].name,
          rate: result.response[0].rate,
          quantity: result.response[0].quantity,
          discount: result.response[0].quantity,
          tax: result.response[0].tax,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // update record
  updateRecord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
      id: this.state.id,
      name: this.state.name,
      rate: this.state.rate,
      quantity: this.state.quantity,
      discount: this.state.discount,
      tax: this.state.tax,
    });
    fetch("http://localhost:8000/api/update", {
      method: "PUT",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          showAlert: true,
          alertMsg: result.response,
          alertType: "success",
          update: false,
          id: "",
          name: "",
          rate: "",
          quantity: "",
          discount: "",
          tax: "",
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  deleteRecord = (id) => {
    fetch("http://localhost:8000/api/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          showAlert: true,
          alertMsg: result.response,
          alertType: "danger",
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <Container>
          {this.state.showAlert === true ? (
            <Alert
              variant={this.state.alertType}
              onClose={() => {
                this.setState({
                  showAlert: false,
                });
              }}
              dismissible
            >
              <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
            </Alert>
          ) : null}

          {/* All Records */}
          <Row>
            <Table className="text-center" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Rate</th>
                  <th>quantity</th>
                  <th>Basic Cost</th>
                  <th>Discount %</th>
                  <th>Dicount Amt</th>
                  <th>Final Basic cost</th>
                  <th>Taxes</th>
                  <th>Tax Amt</th>
                  <th>Total cost</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{(index = index + 1)}</td>
                      <td>{record.name}</td>

                      <td>{record.rate}</td>
                      <td>{record.rate}</td>
                      <td>{record.quantity}</td>
                      <td> {record.quantity * record.rate}</td>
                      <td> {record.discount}</td>
                      <td>
                        {record.quantity *
                          record.rate *
                          (record.discount * 0.01)}
                      </td>
                      <td>
                        {" "}
                        {record.rate * record.quantity -
                          record.quantity *
                            record.rate *
                            (record.discount * 0.01)}
                      </td>
                      <td> {record.tax}</td>
                      <td>
                        {" "}
                        {(record.rate * record.quantity -
                          record.quantity *
                            record.rate *
                            (record.discount * 0.01)) *
                          (record.tax / 100)}
                      </td>
                      <td>
                   
                        &nbsp;&nbsp;&nbsp;
                        <Button
                          variant="danger"
                          onClick={() => this.deleteRecord(record.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>

          {/* Insert Form */}
          <Row>
            <Form>
              {this.state.update === true ? (
                <>
                  <FormGroup>
                    <FormLabel>Enter Id 234</FormLabel>
                    <FormControl
                      type="number"
                      name="id"
                      readOnly
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.id}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter Name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Enter Rate</FormLabel>
                    <FormControl
                      type="number"
                      name="rate"
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.rate}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter Quantity 234</FormLabel>
                    <FormControl
                      type="number"
                      name="quantity"
                      placeholder="Enter the quantity"
                      onChange={this.handleChange}
                      value={this.state.quantity}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter % discount</FormLabel>
                    <FormControl
                      type="text"
                      name="discount"
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.discount}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Enter % Tax </FormLabel>
                    <FormControl
                      type="number"
                      name="tax"
                      value={this.state.tax}
                      onChange={this.handleChange}
                      placeholder="Enter the % of tax"
                    ></FormControl>
                  </FormGroup>
                </>
              ) : null}

              {this.state.update === true ? (
                <Button className="btn btn-primary" onClick={this.updateRecord}>
                  update
                </Button>
              ) : (
                ""
              )}
            </Form>
          </Row>
          <Link to="/addUser">
            {" "}
            <button className="btn btn-success">Add User</button>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Home;
