import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import Swal from 'sweetalert2';
import { getWorkTypesById, updateWorkTypes } from '../../actions/work-type-action';

export default function DialogWorkType({
  setOpenDialog, openDialog, workTypeToUpdate, setRefresh, refresh,
}) {
  const [workTypeInfo, setWorkTypeInfo] = useState({});
  // DAta a enviar
  const [nameWorkType, setNameWorkType] = useState('');
  const [description, setDescription] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNameWorkType(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
  };

  useEffect(() => {
    const getworkTypeByIdAsync = async () => {
      const workTypeData = await getWorkTypesById(workTypeToUpdate);
      setWorkTypeInfo(workTypeData.data);
      setNameWorkType(workTypeData.data.name);
      setDescription(workTypeData.data.description);
    };
    getworkTypeByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updateWorkTypeAsync = async () => {
      const dataUpdate = await updateWorkTypes(
        workTypeToUpdate,
        { name: nameWorkType, description },
      );
      if (dataUpdate.status >= 200 && dataUpdate.status <= 399) {
        Swal.fire(
          'Registro',
          'Tipo de trabajo actualizado correctamente',
          'success',
        );
        setOpenDialog(false);
        setRefresh(!refresh);
      }
    };
    updateWorkTypeAsync();
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
                value={nameWorkType}
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
