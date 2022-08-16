/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material';
import Swal from 'sweetalert2';
import { getAllUsers } from '../../actions/user-action';
import { getVehicleById, updateVehicles } from '../../actions/vehicle-action';

export default function DialogVehicle({
  setOpenDialog, openDialog, vehicleToUpdate, setRefresh, refresh,
}) {
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [users, setUsers] = useState([]);
  // DAta a enviar
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialChasis, setSerialChasis] = useState('');
  const [serialEngine, setSerialEngine] = useState('');
  const [color, setColor] = useState('');
  const [userId, setUserId] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'plate') {
      setPlate(value);
    }
    if (name === 'brand') {
      setBrand(value);
    }
    if (name === 'model') {
      setModel(value);
    }
    if (name === 'serialChasis') {
      setSerialChasis(value);
    }
    if (name === 'serialEngine') {
      setSerialEngine(value);
    }
    if (name === 'color') {
      setColor(value);
    }
    if (name === 'userId') {
      setUserId(value);
    }
  };

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    allUsers();
  }, []);

  useEffect(() => {
    const getVehicleByIdAsync = async () => {
      const vehicleData = await getVehicleById(vehicleToUpdate);
      debugger;
      setVehicleInfo(vehicleData.data);
      setPlate(vehicleData.data.plate);
      setBrand(vehicleData.data.brand);
      setModel(vehicleData.data.model);
      setSerialChasis(vehicleData.data.serialChasis);
      setSerialEngine(vehicleData.data.serialEngine);
      setColor(vehicleData.data.color);
      setUserId(vehicleData.data.userId);
    };
    getVehicleByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updateVehicleAsync = async () => {
      const dataUpdate = await updateVehicles(vehicleToUpdate, {
        plate, brand, model, serialChasis, serialEngine, color, userId,
      });
      if (dataUpdate.status >= 200 && dataUpdate.status <= 399) {
        Swal.fire(
          'Registro',
          'Vehiculo actualizado correctamente',
          'success',
        );
        setOpenDialog(false);
        setRefresh(!refresh);
      }
    };
    updateVehicleAsync();
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <Grid item xs={12}>
          <DialogTitle style={{ textAlign: 'center' }}>
            Editar
          </DialogTitle>
        </Grid>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="plate"
                label="Placa"
                name="plate"
                value={plate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="brand"
                label="Marca"
                name="brand"
                value={brand}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="model"
                label="Modelo"
                id="modelo"
                value={model}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="color"
                required
                fullWidth
                id="color"
                label="Color"
                value={color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="serialChasis"
                label="Numero de chasis"
                name="serialChasis"
                value={serialChasis}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="serialEngine"
                label="Serial de motor"
                name="serialEngine"
                value={serialEngine}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Cliente</InputLabel>
                <Select
                  labelId="customer"
                  id="customer"
                  label="Cliente"
                  onChange={handleChange}
                  value={userId}

                >
                  {users.map((user) => <MenuItem value={user.id}>{user.name}</MenuItem>)}

                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="success">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
