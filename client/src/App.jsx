import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBaseURL = () => {
    const envURL = import.meta.env.VITE_API_BASE_URL;
    console.log('Environment URL:', envURL); // Debug log

    // Fallback for development
    return envURL || 'http://localhost:5001';
  };


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const baseURL = getBaseURL();
        console.log('Fetching from:', `${baseURL}/api/user/list`);
        const response = await axios.get(`${baseURL}/api/user/list`);
        console.log("user", response.data.users);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError("An error occured", error);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async () => {
    console.log("Adding user...");
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const randomNum = Math.floor(Math.random() * 100000);
      const response = await axios.post(`${baseURL}/api/user/create`, {
        name: `Test ${randomNum}`,
        email: `Test${randomNum}@gmail.com`,
      });
      setLoading(true);

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      setError("An error occured", error);
    }
  };

  if (loading) return <h1>Loading users...</h1>;
  if (error) return <h1>Error fetching users... {error}</h1>;
  return (
    <>
      <h1>Users</h1>
      <hr />
      <button onClick={() => addUser()}>Add +</button>
      {users?.length > 0 ? (
        <ul>
          {users?.map((user) => (
            <li key={user?._id}>
              {user?.name}- {user?.email}
            </li>
          ))}
        </ul>
      ) : (
        <div>No users found</div>
      )}
    </>
  );
}

export default App;
