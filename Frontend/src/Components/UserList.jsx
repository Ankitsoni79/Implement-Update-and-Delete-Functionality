import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setMessage("❌ Backend not connected");
    }
  };

  // Add user
  const addUser = async () => {
    if (!name || !email) {
      setMessage("⚠️ Please enter name and email");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    setName("");
    setEmail("");
    setMessage("✅ User added successfully");
    fetchUsers();
  };

  // Update user
  const updateUser = async (id) => {
    const newName = prompt("Enter new name");
    if (!newName) return;

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    });

    setMessage("✏️ User updated successfully");
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    setMessage("🗑️ User deleted successfully");
    fetchUsers();
  };

  return (
    <div>
      {/* Add User Form */}
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      {/* Message */}
      {message && <p>{message}</p>}

      {/* User List */}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email})
              <button onClick={() => updateUser(user._id)}>Edit</button>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
