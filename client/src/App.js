import React from 'react';
import Popup from 'reactjs-popup';
import './App.css';
const validator = require('validator');


function App() {
  const [data, setData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [updatedFirstName, setUpdatedFirstName] = React.useState("");
  const [updatedLastName, setUpdatedLastName] = React.useState("");
  const [updatedEmail, setUpdatedEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");

  let userData = { 
    firstName: firstName, 
    lastName: lastName, 
    email: email 
  };

  let updatedUserData = {
    firstName: updatedFirstName,
    lastName: updatedLastName,
    email: updatedEmail
  }

  const updateUser = async (id) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserData)
    };
    const response = await fetch('/users/' + id, requestOptions);
    const data = await response.json();
    setData(data);
  }

  React.useEffect(() => {
    fetch("/users", {
      headers: { "accepts": "application/json" }
    })
      .then(res => res.json())
        .then(data => setData(data));
  }, []);
  
  const removeUser = (id) => {
    fetch("/users/" + id, {
      method: 'DELETE',
      headers: { "accepts": "application/json" }
    });

    const newList = data.filter(user => user._id !== id);
    setData(newList);
  }

  const addUser = async () => {
    if (firstName === "" || lastName === "" || email === "") {
      alert("Please fill in the required fields.")
    }
    if (!validator.isEmail(email)) { 
      alert("Please enter a valid email.")
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    };
    const response = await fetch('/users', requestOptions);
    const data = await response.json();
    setData(data);
  }

  const openPopup = async (user) => {
    setUserId(user._id);
    setIsOpen(!isOpen);
    setUpdatedFirstName(user.firstName);
    setUpdatedLastName(user.lastName);
    setUpdatedEmail(user.email);
  }

  const closePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="App">
      <header id="app-header">
        <h1 data-testid="header">User Management System</h1>
      </header>
      <form onSubmit={addUser} id="add-user-form" data-testid="form">
        <label htmlFor="fname">First Name</label><br></br>
        <input type="text" name="fname" className="name-input"  data-testid="first_name" onChange={event => setFirstName(event.target.value)}></input><br></br>
        <label htmlFor="lname">Last Name</label><br></br>
        <input type="text" name="lname" className="name-input" onChange={event => setLastName(event.target.value)}></input><br></br>
        <label htmlFor="email">Email</label><br></br>
        <input type="text" name="email" id="email-input" onChange={event => setEmail(event.target.value)}></input><br></br>
        <input type="submit" value="New user" id="add-user-btn"></input>
      </form>
      { data.map((user) => {
        if (user._id === userId) {
          return (
            <Popup open={isOpen} closeOnDocumentClick={false}>
            <div key={user._id}>
            <form onSubmit={() => updateUser(user._id)} >
                <label htmlFor="fname">First Name</label><br></br>
                <input type="text" name="fname" defaultValue={user.firstName} className="name-input" onChange={event => setUpdatedFirstName(event.target.value)}></input><br></br>
                <label htmlFor="lname">Last Name</label><br></br>
                <input type="text" name="lname" defaultValue={user.lastName} className="name-input" onChange={event => setUpdatedLastName(event.target.value)}></input><br></br>
                <label htmlFor="email">Email</label><br></br>
                <input type="text" name="email" defaultValue={user.email} id="email-input" onChange={event => setUpdatedEmail(event.target.value)}></input><br></br>
                <input type="submit" value="Save" id="save-btn"></input>
                <input type="button" value="Cancel" id="cancel-btn" onClick={closePopup}></input>
            </form>
            </div>
            </Popup>
          );
        }      
      })}
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
              <td className="table-input">{user.firstName}</td>
              <td className="table-input">{user.lastName}</td>
              <td className="table-input">{user.email}</td>
              <td><button id="edit-btn" onClick={() => openPopup(user)}>Update</button>
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