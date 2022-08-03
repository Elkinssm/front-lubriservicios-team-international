import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import Login from './Components/login/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Grid>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/auth/login" element={<Login />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
