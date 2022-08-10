import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Checkbox,
  FormControl, FormControlLabel, InputLabel,
} from '@mui/material';
import Swal from 'sweetalert2';
import { registerOrderWorkTypes } from '../../actions/order-work-type-action';
import { getAllOrders } from '../../actions/order-action';
import { getAllWorkTypes } from '../../actions/work-type-action';

const theme = createTheme();

export default function CreateOrderWorkType() {
  const [orders, setOrders] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [orderWorks, setOrderWorks] = useState([]);
  const [works, setWorks] = useState([]);
  const { id } = useParams();
  const [checked, setChecked] = useState([true, false]);

  const handleChangeWorkType = (event) => {
    setWorks(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const allOrders = async () => {
      const response = await getAllOrders();
      setOrders(response.data);
    };
    allOrders();
  }, []);

  useEffect(() => {
    const allWorkTypes = async () => {
      const response = await getAllWorkTypes();
      setWorkType(response.data);
    };
    allWorkTypes();
  }, []);

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registertData = {
      workTypeId: works,
      orderId: id,
    };
    registerOrderWorkTypes(registertData).then(
      (response) => {
        if (response.status === 201 || response.code === 201) {
          Swal.fire(
            'Registro',
            'Orden tipo de trabajo creada correctamente',
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
            Tipo de orden de trabajo
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Typography>Tipo de trabajo</Typography>
                  <FormControlLabel
                    label="Tipo de trabajo"
                    control={(
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}

                      />
)}
                  />

                  {/* {workType.map((work) => <Checkbox value={work.id}>{work.name}</Checkbox>)} */}

                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Orden</InputLabel>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Tipo orden de trabajo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
