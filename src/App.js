import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Pages/Dashboard/dashboard';
import Register from './Components/Register/Register';
import CreateVehicle from './Pages/Vehicle/CreateVehicle';
import CreateMaterial from './Pages/Materials/CreateMaterial';
import CreateOrder from './Pages/Orders/CreateOrder';
import CreateWorkType from './Pages/WorkType/CreateWorkType';
import CreateRol from './Pages/Rol/CreateRol';
import CreateWorkMaterials from './Pages/WorksMaterials/CreateWorkMaterials';
import CreateOrderWorkType from './Pages/OrderWorkType/CreateOrderWorkType';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Grid>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/auth/login" element={<SignIn />} />
            <Route exact path="/dashboard/" element={<Dashboard />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/create-vehicle" element={<CreateVehicle />} />
            <Route exact path="/create-material" element={<CreateMaterial />} />
            <Route exact path="/create-order" element={<CreateOrder />} />
            <Route
              exact
              path="/create-work-type"
              element={<CreateWorkType />}
            />
            <Route exact path="/create-work-material" element={<CreateWorkMaterials />} />
            <Route exact path="/create-order-work-type" element={<CreateOrderWorkType />} />
            <Route exact path="/create-rol" element={<CreateRol />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
