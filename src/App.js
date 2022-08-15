import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Pages/Dashboard/dashboard';
import Register from './Components/Register/Register';
import CreateVehicle from './Pages/Vehicle/CreateVehicle';
import CreateMaterial from './Pages/Materials/CreateMaterial';
import CreateOrder from './Pages/Orders/CreateOrder';
import CreateRol from './Pages/Rol/CreateRol';
import CreateWorkMaterials from './Pages/WorksMaterials/CreateWorkMaterials';
import CreateOrderWorkType from './Pages/OrderWorkType/CreateOrderWorkType';
import MaterialAccordion from './Pages/Materials/MaterialAccordion';
import Footer from './Components/Footer/footer';
import UserAccordion from './Components/Register/UsersAccordion';
import CreateWorkType from './Pages/WorkType/CreateWorkType';
import VehicleAccordion from './Pages/Vehicle/VehicleAccordion';
import OrderAccordion from './Pages/Orders/OrderAccordion';
import WorkTypeAccordion from './Pages/WorkType/WorkTypeAccordion';
import RolAccordion from './Pages/Rol/RolAccordion';
import Home from './Pages/Dashboard/Home';
import DialogRol from './Pages/Rol/DialogRol';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact index path="/auth/login" element={<SignIn />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route exact path="create-vehicle" element={<CreateVehicle />} />
            <Route exact path="create-material" element={<CreateMaterial />} />
            <Route exact path="create-order" element={<CreateOrder />} />
            <Route
              exact
              path="create-work-type"
              element={<CreateWorkType />}
            />
            <Route exact path="create-work-material" element={<CreateWorkMaterials />} />
            <Route exact path="create-order-work-type/:id" element={<CreateOrderWorkType />} />
            <Route exact path="create-rol" element={<CreateRol />} />
            <Route exact path="materials" element={<MaterialAccordion />} />
            <Route exact path="users" element={<UserAccordion />} />
            <Route exact path="vehicles" element={<VehicleAccordion />} />
            <Route exact path="orders" element={<OrderAccordion />} />
            <Route exact path="work-types" element={<WorkTypeAccordion />} />
            <Route exact path="rols" element={<RolAccordion />} />
            <Route exact path="rols" element={<RolAccordion />} />
            <Route exact path="update-rols" element={<DialogRol />} />

          </Route>
          <Route
            exact
            path="*"
            element={(
              <>
                <h1>Error 404</h1>
                <strong>Esta pagina no existe</strong>
              </>
            )}
          />

        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
