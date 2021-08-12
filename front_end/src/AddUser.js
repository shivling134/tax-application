import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
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

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: "",
      // rate: "",
      // selectedFile: "",
      // records: [],
      // showAlert: false,
      // alertMsg: "",
      // alertType: "success",
      // id: "",
      // update: false,
      id: "",
      name: "",
      rate: "",
      quantity: "",
      discount: "",
      tax: "",
      records: [],
      showAlert: false,
      alertMsg: "",
      alertType: "success",
      update: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
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
      quantity: this.state.quantity,
      discount: this.state.discount,
      tax: this.state.tax
      
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
          selectedFile: "",
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
          selectedFile: result.response[0].selectedFile,
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
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  // delete a record
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
  //img
  changeHandlerlast = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleSubmission1 = (e1) => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
  };

  render() {
    return (
      <div>
        <h1 className="App">Add New User</h1>
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

          {/* Insert Form */}
          <Row>
            <Form>
              <FormGroup>
                <FormGroup>
                <FormLabel>Enter Id</FormLabel>
                <FormControl
                  type="number"
                  name="id"
                  placeholder="Enter the name"
                  onChange={this.handleChange}
                  value={this.state.id}
                ></FormControl>
              </FormGroup>

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
                   type='number'
                name="rate"
                  value={this.state.rate}
                  onChange={this.handleChange}
                  placeholder="Enter the Rate"
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Enter Quantity</FormLabel>
             
                   <FormControl
                name="quantity"
                type='number'
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  placeholder="Enter the Quantity"
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>enter discount : </FormLabel>
                <FormControl
                  type="number"
                  defaultValue="d"
                  name="discount"
                  value={this.state.discount}
                  onChange={this.handleChange}
                  placeholder="Enter the Discount"
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Enter % tax</FormLabel>
                <FormControl
                  type="number"
                  name="tax"
                  value={this.state.tax}
                  onChange={this.handleChange}
                  placeholder="Enter % tax"
                ></FormControl>
              </FormGroup>

              {/* {console.log(this.state.selectedFile.name)} */}
{/* 
              {this.state.update === true ? (
                <Button className="btn btn-primary" onClick={this.updateRecord}>
                  update
                </Button>
              ) : (
                <Button clasName="btn btn-danger">
                  <Link
                    style={{ color: "white" }}
                    to="/"
                    onClick={this.addRecord}
                  >
                    Save
                  </Link>
                </Button>
              )} */}
            </Form>
          </Row>
          <br/><br/>
          <Link to="/" onClick={this.addRecord}>
            {" "}
            <button className="btn btn-success">Add User</button>
          </Link>
          &nbsp;&nbsp;&nbsp;

          <Link to="/">
          
            <button className="btn btn-success ">Home</button>
          </Link>
        </Container>
      </div>
    );
  }
}
