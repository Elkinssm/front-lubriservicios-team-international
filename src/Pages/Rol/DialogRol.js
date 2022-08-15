/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { getRolById, updateRols } from '../../actions/rol-action';

export default function DialogRol({
  setOpenDialog, openDialog, rolToUpdate, setRefresh, refresh,
}) {
  const [rolInfo, setRolInfo] = useState({});
  // DAta a enviar
  const [nameRol, setNameRol] = useState('');
  const [description, setDescription] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNameRol(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
  };

  useEffect(() => {
    const getRolByIdAsync = async () => {
      const rolData = await getRolById(rolToUpdate);
      debugger;
      setRolInfo(rolData.data);
      setNameRol(rolData.data.name);
      setDescription(rolData.data.description);
    };
    getRolByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updateRolsAsync = async () => {
      const dataUpdate = await updateRols(rolToUpdate, { name: nameRol, description });
      if (dataUpdate.status >= 200 && dataUpdate.status <= 399) {
        alert('ok');
        setOpenDialog(false);
        setRefresh(!refresh);
      }
    };
    updateRolsAsync();
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={nameRol}
                onChange={handleChange}
                id="name"
                label="Nombre"
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={description}
                onChange={handleChange}
                id="description"
                label="Descripcion"
                name="description"
              />
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
