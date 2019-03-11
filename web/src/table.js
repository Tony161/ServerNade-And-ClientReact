import React, { Component } from 'react';

import CoreTable from './coreTable';

class Table extends Component {
  render() {
    const { data, deleteHandler, addHandler, editHandler } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Company</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <CoreTable
              key={i}
              row={row}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))}
          <tr>
            <td />
            <td>
              <input
                type="text"
                defaultValue=""
                ref={input => (this.name = input)}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue=""
                ref={input => (this.surname = input)}
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue=""
                ref={input => (this.company = input)}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  addHandler(
                    this.name.value,
                    this.surname.value,
                    this.company.value,
                  )
                }
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
