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
import Swal from 'sweetalert2';
import { registerWorkMaterials } from '../../actions/work-materials-action';
import { getAllWorkTypes } from '../../actions/work-type-action';
import { getAllMaterials } from '../../actions/material-action';

const theme = createTheme();

export default function CreateWorkMaterials() {
  const [workTypes, setWorkTypes] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const allWorkTypes = async () => {
      const response = await getAllWorkTypes();
      setWorkTypes(response.data);
    };
    allWorkTypes();
  }, []);

  useEffect(() => {
    const allMaterials = async () => {
      const response = await getAllMaterials();
      setMaterials(response.data);
    };
    allMaterials();
  }, []);

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registertData = {
      quantity: data.get('quantity'),
      materialId: 1, // data.get('materialId'),
      workTypeId: 1, // data.get('workTypeId'),
    };
    registerWorkMaterials(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          Swal.fire(
            'Registro',
            'Material de trabajo creado correctamente',
            'success',
          );
          history('/');
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
            Materiales de trabajo
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
                  id="quantity"
                  label="Cantidad"
                  name="quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="materialId"
                  label="Material"
                  name="materialId"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="workTypeId"
                  label="Tipo de trabajo"
                  name="workTypeId"

                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear material de trabajo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
