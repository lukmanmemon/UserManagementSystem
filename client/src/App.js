import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const [data, setData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    fetch("/users", {
      headers: {
        "accepts": "application/json"
      }
    })
      .then((res) => res.json())
        .then((data) => setData(data));
  }, []);

  console.log(data);
  
  const removeUser = (id) => {
    fetch("/users/" + id, {
      method: 'DELETE',
      headers: {
        "accepts": "application/json"
      }
    })
      .then((res) => res.json())
        .then((data) => setData(data));     
  }

  const addUser = () => {
    fetch("/users", {
      method: 'POST',
      body: {firstName: firstName, lastName: lastName, email: email},
      headers: {
        "accepts": "application/json"
      }
    })
      .then((res) => res.json())
        .then((data) => setData(data));   
  }

  return (
    <div className="App">
      <header id="app-header">
        <h1>User Management System</h1>
      </header>
      <form onSubmit={addUser} id="add-user-form">
        <label for="fname">First Name</label>
        <input type="text" name="fname" onChange={event => setFirstName(event.target.value)}></input>
        <label for="lname">Last Name</label>
        <input type="text" name="lname" onChange={event => setLastName(event.target.value)}></input><br></br>
        <label for="email">Email</label>
        <input type="text" name="email" onChange={event => setEmail(event.target.value)}></input><br></br>
        <input type="submit" value="New user" id="add-user-btn"></input>
      </form>
      <h3 id="app-sub-header">Users</h3>
      <table id="users">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
        </tr>
        </thead>
      { data.map((user) => {
        return (
          <tbody>
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td><button><i className="fa fa-edit" id="edit-btn"></i></button></td>
              <td><button onClick={() => removeUser(user.id)}><i className="fa fa-trash" id="delete-btn"></i></button></td>
            </tr>
          </tbody>
        )
      })}
      </table>
    </div>
  );
}

export default App;
