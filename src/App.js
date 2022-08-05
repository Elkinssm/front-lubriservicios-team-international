import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Pages/Dashboard/dashboard';
import Register from './Components/Register/Register';

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
          </Routes>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
