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
import { registerOrderWorkTypes } from '../../actions/order-work-type-action';
import { getAllOrders } from '../../actions/order-action';
import { getAllWorkTypes } from '../../actions/work-type-action';

const theme = createTheme();

export default function CreateOrderWorkType() {
  const [orders, setOrders] = useState([]);
  const [workType, setWorkType] = useState([]);

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
      workTypeId: 1, // data.get('workTypeId'),
      orderId: 1, // data.get('descriorderIdption'),
    };
    registerOrderWorkTypes(registertData).then(
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
                <TextField
                  required
                  fullWidth
                  id="workTypeId"
                  label="Tipo de trabajo"
                  name="workTypeId"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="orderId"
                  label="Orden"
                  name="orderId"
                  // autoComplete="email"
                />
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
