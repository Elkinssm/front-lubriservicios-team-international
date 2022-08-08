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
import { getAllUsers } from '../../actions/user-action';
import { registerOrder } from '../../actions/order-action';
import { getAllVehicles } from '../../actions/vehicle-action';

const theme = createTheme();

export default function CreateOrder() {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    allUsers();
  }, []);

  useEffect(() => {
    const allVehicles = async () => {
      const response = await getAllVehicles();
      setVehicles(response.data);
    };
    allVehicles();
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
      status: data.get('status'),
      userId: 1,
      vehicleId: 1,
    };
    registerOrder(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          history('/');
        } else {
        }
      },
      (error) => {},
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
                <TextField
                  required
                  fullWidth
                  id="status"
                  label="Estado"
                  name="status"
                />
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
