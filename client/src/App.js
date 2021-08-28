import React from 'react';
import './App.css';

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
      .then(res => res.json())
        .then(data => setData(data));
  }, []);
  
  const removeUser = (id) => {
    fetch("/users/" + id, {
      method: 'DELETE',
      headers: {
        "accepts": "application/json"
      }
    })

    const newList = data.filter(user => user._id !== id);
    setData(newList);
  }

  const addUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email })
    };
    const response = await fetch('/users', requestOptions);
    const data = await response.json();
    setData(data);

  }

  return (
    <div className="App">
      <header id="app-header">
        <h1>User Management System</h1>
      </header>
      <form onSubmit={addUser} id="add-user-form">
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" onChange={event => setFirstName(event.target.value)}></input>
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" onChange={event => setLastName(event.target.value)}></input><br></br>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email-input" onChange={event => setEmail(event.target.value)}></input><br></br>
        <input type="submit" value="New user" id="add-user-btn"></input>
      </form>
      <table id="users">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
      { data.map((user) => {
        return (
          <tbody>
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td><button id="edit-btn">Edit</button>
              <button id="delete-btn" onClick={() => removeUser(user._id)}>Delete</button>
              </td>
              
            </tr>
          </tbody>
        )
      })}
      </table>
    </div>
  );
}

export default App;
