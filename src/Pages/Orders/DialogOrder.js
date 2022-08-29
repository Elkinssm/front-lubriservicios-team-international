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
import { getOrderById, updateOrders } from '../../actions/order-action';
import { orderStatus } from './models';

export default function DialogOrder({
  setOpenDialog, openDialog, orderToUpdate, setRefresh, refresh,
}) {
  const [status, setStatus] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  // DAta a enviar
  const [dateIn, setDateIn] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [kmsIn, setKmsIn] = useState('');
  const [ownerDescription, setOwnerDescription] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [workPerformed, setWorkPerformed] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'dateIn') {
      setDateIn(value);
    }
    if (name === 'dateOut') {
      setDateOut(value);
    }
    if (name === 'totalValue') {
      setTotalValue(value);
    }
    if (name === 'kmsIn') {
      setKmsIn(value);
    }
    if (name === 'ownerDescription') {
      setOwnerDescription(value);
    }
    if (name === 'diagnostic') {
      setDiagnostic(value);
    }
    if (name === 'workPerformed') {
      setWorkPerformed(value);
    }
    if (name === 'diagnostic') {
      setDiagnostic(value);
    }
    if (name === 'status') {
      setStatusOrder(value);
    }
  };

  useEffect(() => {
    const getOrderByIdAsync = async () => {
      const orderData = await getOrderById(orderToUpdate);
      setOrderInfo(orderData.data);
      setDateIn(orderData.data.dateIn);
      setDateOut(orderData.data.dateOut);
      setTotalValue(orderData.data.totalValue);
      setKmsIn(orderData.data.kmsIn);
      setOwnerDescription(orderData.data.ownerDescription);
      setWorkPerformed(orderData.data.workPerformed);
      setDiagnostic(orderData.data.diagnostic);
      setStatusOrder(orderData.data.status);
    };
    getOrderByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChangeStatusSelect = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = () => {
    const updateOrderAsync = async () => {
      const dataUpdate = await updateOrders(orderToUpdate, {
        status: statusOrder,
        dateIn,
        dateOut,
        totalValue,
        kmsIn,
        ownerDescription,
        workPerformed,
        diagnostic,
      });
      if (dataUpdate.status >= 200 && dataUpdate.status <= 399) {
        Swal.fire(
          'Registro',
          'Orden actualizada correctamente',
          'success',
        );
        setOpenDialog(false);
        setRefresh(!refresh);
      }
    };
    updateOrderAsync();
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
                id="dateIn"
                label="Fecha entrada"
                name="dateIn"
                value={dateIn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="dateOut"
                label="Fecha salida"
                name="dateOut"
                value={dateOut}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="totalValue"
                label="Valor total"
                id="totalValue"
                value={totalValue}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="kmsIn"
                required
                fullWidth
                id="kmsIn"
                label="Kilometros"
                value={kmsIn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="ownerDescription"
                label="Descripcion del cliente"
                name="ownerDescription"
                value={ownerDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="diagnostic"
                label="Diagnostico"
                name="diagnostic"
                value={diagnostic}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="workPerformed"
                label="Trabajo realizado"
                name="workPerformed"
                value={workPerformed}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Estado</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  label="Estado"
                  // onChange={handleChangeStatus}
                  onChange={handleChange}
                  value={statusOrder}
                >
                  {orderStatus.map((item) => <MenuItem value={item.key}>{item.value}</MenuItem>)}

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
