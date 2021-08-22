import './App.css';
import React from 'react';

function App() {
  //const [users, setUsers] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/users")
  //     .then((res) => res.json())
  //       .then((data) => console.log(data));
  // });

  return (
    <div className="App">
      <header id="app-header">
        <h1>User Management System</h1>
      </header>
      <h3 id="app-sub-header">Users</h3>
      <button id="add-users-btn">New user</button>
    </div>
  );
}

export default App;
