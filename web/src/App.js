import React, { Component } from 'react';
import Table from './table';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () =>
    axios.get('http://localhost:3003/persons').then(response => {
      this.setState({
        data: response.data,
      });
    });

  deleteBtn = id => {
    axios.delete(`http://localhost:3003/persons/${id}`).then(response => {
      this.setState({
        data: response.data,
      });
    });
  };

  addBtn = (name, surname, company) => {
    axios
      .post('http://localhost:3003/persons', {
        name,
        surname,
        company,
      })
      .then(response => {
        this.setState({
          data: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editBtn = (id, name, surname, company) => {
    axios
      .put(`http://localhost:3003/persons/${id}`, {
        name,
        surname,
        company,
      })
      .then(response => {
        this.setState({
          data: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <Table
          data={this.state.data}
          deleteHandler={this.deleteBtn}
          addHandler={this.addBtn}
          editHandler={this.editBtn}
          loadHandler={this.loadData}
        />
      </div>
    );
  }
}

export default App;
