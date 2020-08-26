

import React, { Component } from "react";
import UserService from "../services/user.service";
import "./administration.css";

export default class UserListBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      users: []
    };
  }

  componentDidMount() {
    UserService.getUsers().then(
      response => {
        this.setState({
          content: response.data,
          users: []
        }, () => {
          for (let key in this.state.content) {
            this.setState(state => {
              state.users.push(this.state.content[key]);
            });
          }
          this.setState({});
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    let users = this.state.users;
    const dateFormat = new Intl.DateTimeFormat('UK', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return (
      <div className="container-custom">
        <table style={{ width: '100%' }}>
          <thead>
            <tr> 
              <th onClick={() => sortTable(0)}>ID</th>
              <th onClick={() => sortTable(1)}>Korisničko ime</th>
              <th onClick={() => sortTable(2)}>Posljednja igra</th>
              <th onClick={() => sortTable(3)}>Najveći rezultat</th>
            </tr>
          </thead>
          <tbody id="tbody-users">
            {users.map(user =>
              <tr key={user.id} onClick={() => { this.props.history.push("/users/" + user.id) }}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.scores.length === 0 ? "-----" : UserService.getLastScoreDate(user.scores)}</td>
                <td>{UserService.getHighScore(user.scores)}</td>
              </tr>)}
          </tbody>
        </table>

      </div>
    );
  }
}

let index;      // cell index
let toggleBool; // sorting asc, desc 
function sortTable(idx) {
  index = idx;
  if (toggleBool) {
    toggleBool = false;
  } else {
    toggleBool = true;
  }
  let tbody = document.getElementById("tbody-users");
  let datas = [];
  let tbodyLength = tbody.rows.length;
  for (let i = 0; i < tbodyLength; i++) {
    datas[i] = tbody.rows[i];
  }

  // sort by cell[index] 
  datas.sort(compareCells);
  for (let i = 0; i < tbody.rows.length; i++) {
    // rearrange table rows by sorted rows
    tbody.appendChild(datas[i]);
  }
}

function compareCells(a, b) {
  let aVal = a.cells[index].innerText;
  let bVal = b.cells[index].innerText;

  aVal = aVal.replace(/,/g, '');
  bVal = bVal.replace(/,/g, '');

  if (toggleBool) {
    let temp = aVal;
    aVal = bVal;
    bVal = temp;
  }

  if (aVal.match(/^[0-9]+$/) && bVal.match(/^[0-9]+$/)) {
    return parseFloat(aVal) - parseFloat(bVal);
  }
  else {
    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    } else {
      return 0;
    }
  }
}