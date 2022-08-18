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
    //   const workTypesData = response.data.map((workTypeData) => {
    //     const isChecked = false;
    //     return { ...workTypeData, isChecked };
    //   });
    //   setWorkType(workTypesData);
    // };
    allWorkTypes();
  }, []);

  const history = useNavigate();

  const handleSubmit = (event) => {
    debugger;
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
          history('/dasboard/orders');
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

  const onChangeClause = (e, id) => {
    e.preventDefault();
    const { checked } = e.target;
    if (works.length > 0) {
      const previousWorks = [...works];
      const index = previousWorks.findIndex((x) => x.id === id);
      if (checked && index === -1) {
        previousWorks.push(id);
        setWorks(previousWorks);
        return;
      }

      if (index !== -1) {
        previousWorks.splice(index, 1);
        setWorks(previousWorks);
      }
    } else {
      setWorks([id]);
    }
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
                  {/* {workType.map((work) => (
                    <FormControlLabel
                      label={work.name}
                      name={`checkLabel${work.id}`}
                      control={(
                        <Checkbox
                          defaultChecked={work.isChecked}
                          checked={checked}
                          onChange={handleChange}
                          value={work.isChecked}
                          name={`check${work.id}`}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    )}
                    />
                  ))} */}

                  {workType.map((modelo) => (
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                      >
                        <Checkbox
                          defaultChecked={modelo.isChecked}
                          color="primary"
                          name={`checkBox${modelo.id}`}
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          checked={modelo.isChecked}
                          onChange={(event) => onChangeClause(event, modelo.id)}

                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography key={modelo.id}>
                          {modelo.name}
                        </Typography>
                        <Typography id="alert-dialog-description">
                          {modelo.definitionClause}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}

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
