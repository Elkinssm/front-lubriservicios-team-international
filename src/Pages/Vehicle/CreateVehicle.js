import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import Swal from 'sweetalert2';
import { getAllUsers } from '../../actions/user-action';
import { registerVehicle } from '../../actions/vehicle-action';

const theme = createTheme();

export default function CreateVehicle() {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [customer, setCustomer] = useState([]);

  const handleChange = (event) => {
    setCustomer(event.target.value);
  };

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    allUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registertData = {
      plate: data.get('plate'),
      brand: data.get('brand'),
      model: data.get('model'),
      serialChasis: data.get('serialChasis'),
      serialEngine: data.get('serialEngine'),
      color: data.get('color'),
      userId: customer,
    };
    registerVehicle(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          Swal.fire(
            'Registro',
            'Vehiculo creado correctamente',
            'success',
          );
          history('/dashboard/vehicles');
        } else if (response.status === 400 || response.code === 400
          || response.status === 409 || response.code === 409) {
          Swal.fire(
            'Acceso',
            'Por favor valide los datos ingresados',
            'error',
            'Vuelva a intentarlo',
          );
        } else {
          Swal.fire({
            title: 'Autorizacion',
            text: 'Usted no tiene autorizacion',
            icon: 'warning',
            footer: 'Contacte el administrador',
          });
        }
      },

    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Creacion de vehiculos
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="plate"
                  label="Placa"
                  name="plate"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="brand"
                  label="Marca"
                  name="brand"
                  // autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="model"
                  label="Modelo"
                  id="modelo"
                  // autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="color"
                  required
                  fullWidth
                  id="color"
                  label="Color"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="serialChasis"
                  label="Numero de chasis"
                  name="serialChasis"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="serialEngine"
                  label="Serial de motor"
                  name="serialEngine"
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
                  >
                    {users.map((user) => <MenuItem value={user.id}>{user.name}</MenuItem>)}

                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Vehiculo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
