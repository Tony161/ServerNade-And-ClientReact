import React, { Component } from 'react';

class coreTable extends Component {
  state = { editMode: false };

  toggleState = () => this.setState({ editMode: !this.state.editMode });

  edit = (id, name, surname, company) => {
    this.props.editHandler(id, name, surname, company);
    this.setState({ editMode: false });
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
          <button onClick={this.toggleState}>Edit</button>
        </td>
        <td>
          <button onClick={() => deleteHandler(row.id)}>Delete</button>
        </td>
      </tr>
    );
  }
}
export default coreTable;
