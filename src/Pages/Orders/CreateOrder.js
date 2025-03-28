import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
import { registerOrder } from '../../actions/order-action';
import { getAllVehicles } from '../../actions/vehicle-action';
import { orderStatus } from './models';

const theme = createTheme();

export default function CreateOrder() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [userVehicle, setUserVehicle] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleChangeCustomer = (user) => {
    setVehicles([]);
    setCustomer(user.id);
    setVehicles(user.vehicle);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeVehicle = (event) => {
    setUserVehicle(event.target.value);
  };

  useEffect(() => {
    const allVehicles = async () => {
      const response = await getAllVehicles();
      setVehicles(response.data);
    };
    allVehicles();
  }, []);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    allUsers();
  }, []);

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registertData = {
      dateIn: data.get('dateIn'),
      dateOut: data.get('dateOut'),
      totalValue: data.get('totalValue'),
      kmsIn: data.get('kmsIn'),
      ownerDescription: data.get('ownerDescription'),
      diagnostic: data.get('diagnostic'),
      workPerformed: data.get('workPerformed'),
      status,
      userId: customer,
      vehicleId: userVehicle,
    };
    registerOrder(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          Swal.fire(
            'Registro',
            'Orden creada correctamente',
            'success',
          );
          console.log(response);
          history(`/dashboard/create-order-work-type/${response.data.id}`);
        } else if (response.status === 400 || response.code === 400) {
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
            Creacion de ordenes
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
                  id="dateIn"
                  label="Fecha entrada"
                  name="dateIn"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dateOut"
                  label="Fecha salida"
                  name="dateOut"
                  // autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="totalValue"
                  label="Valor total"
                  id="totalValue"
                  // autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="kmsIn"
                  required
                  fullWidth
                  id="kmsIn"
                  label="Kilometros"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ownerDescription"
                  label="Descripcion del cliente"
                  name="ownerDescription"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="diagnostic"
                  label="Diagnostico"
                  name="diagnostic"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="workPerformed"
                  label="Trabajo realizado"
                  name="workPerformed"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Estado</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    label="Estado"
                    onChange={handleChangeStatus}
                  >
                    {orderStatus.map((item) => <MenuItem value={item.key}>{item.value}</MenuItem>)}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Cliente</InputLabel>
                  <Select
                    labelId="customer"
                    id="customer"
                    label="Cliente"

                  >
                    {users.map((user) => (
                      <MenuItem
                        value={user.id}
                        onClick={(e) => handleChangeCustomer(user, e)}
                      >
                        {user.name}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Vehiculo</InputLabel>
                  <Select
                    labelId="userVehicle"
                    id="userVehicle"
                    label="Vehiculo"
                    onChange={handleChangeVehicle}
                  >
                    {vehicles.map((car) => (
                      <MenuItem
                        value={car.id}
                      >
                        {car.plate}
                      </MenuItem>
                    ))}

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
              Crear Orden
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
