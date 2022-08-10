import React from 'react';
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
import Swal from 'sweetalert2';
import { registerMaterial } from '../../actions/material-action';

const theme = createTheme();

export default function CreateMaterial() {
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registertData = {
      name: data.get('name'),
      description: data.get('description'),
      reference: data.get('reference'),
      category: data.get('category'),
      brand: data.get('brand'),
    };
    registerMaterial(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          Swal.fire(
            'Registro',
            'Material creado correctamente',
            'success',
          );
          history('/materials');
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
            Creacion de materiales
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Descripcion"
                  name="description"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="reference"
                  label="Referencia"
                  id="reference"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="category"
                  required
                  fullWidth
                  id="category"
                  label="Categoria"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="brand"
                  label="Marca"
                  name="brand"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear material
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
