import React, { useEffect, useState } from 'react';
import AppContainer from '../../Components/Container/appContainer';
import Footer from '../../Components/Footer/footer';
import { getAllUsers } from '../../actions/user-action';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    allUsers();
  }, []);

  console.log(getAllUsers());
  return (
    <div>
      <AppContainer />
      <Footer />
    </div>
  );
}

export default Dashboard;
