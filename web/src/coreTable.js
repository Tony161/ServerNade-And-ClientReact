import React, { Component } from 'react';
import axios from 'axios';

class coreTable extends Component {
  state = { editMode: false, file: null };

  toggleState = () => this.setState({ editMode: !this.state.editMode });

  edit = (id, name, surname, company) => {
    this.props.editHandler(id, name, surname, company);
    this.setState({ editMode: false });
  };

  resetFile = () =>
    this.setState({ file: null });

  onFormSubmit = (event) => {
    event.preventDefault()
    this.fileUpload(this.state.file)
      .then((response) => {
        this.props.loadHandler();
        this.resetFile();
      })
  }

  onChangeFile = (event) => {
    this.setState({ file: event.target.files[0] })
  }

  fileUpload = (file) => {
    const url = 'http://localhost:3003/upload-image';
    const formData = new FormData();
    formData.append(`image-${this.props.row.id}`, file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config)
  }

  onChangeImageClick = (event) => {
    event.preventDefault();
    this.inputFile.click();
  };

  render() {
    const { row, deleteHandler } = this.props;

    if (this.state.editMode) {
      return (
        <tr>
          <td />
          <td>
            <input
              type="text"
              defaultValue={row.name}
              placeholder="test"
              ref={input => (this.name = input)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={row.surname}
              placeholder="test"
              ref={input => (this.surname = input)}
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={row.company}
              placeholder="test"
              ref={input => (this.company = input)}
            />
          </td>
          <td>
            {row.image ? (
              <img
                src={`http://localhost:3003/images/${row.image}`}
                alt="avatar"
                height="80"
              />
            ) : (
                ''
              )}
          </td>
          <td>
            <button onClick={this.toggleState}>Cancel</button>
          </td>
          <td>
            <button
              onClick={() =>
                this.edit(
                  row.id,
                  this.name.value,
                  this.surname.value,
                  this.company.value,
                )
              }
            >
              Save
            </button>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.surname}</td>
        <td>{row.company}</td>
        <td>
          {row.image ? (
            <img
              src={`http://localhost:3003/images/${row.image}`}
              alt="avatar"
              height="80"
            />
          ) : (
              ''
            )}
        </td>
        <td>
          <button onClick={this.toggleState}>Edit</button>
        </td>
        <td>
          <button onClick={() => deleteHandler(row.id)}>Delete</button>
        </td>
        <td>
          <form onSubmit={this.onFormSubmit} >
            <input type="file"
              onChange={this.onChangeFile}
              ref={input => this.inputFile = input}
              style={{ display: 'none' }} />
            {!this.state.file && <button name="add"
              onClick={this.onChangeImageClick}
            >Change Image</button>}
            {this.state.file && <button type="submit">Upload</button>}
            {this.state.file && <button onClick={this.resetFile}>Cancel</button>}
          </form>
        </td>
      </tr>
    );
  }
}

export default coreTable;
