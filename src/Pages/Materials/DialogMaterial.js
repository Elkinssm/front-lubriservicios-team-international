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
import { getMaterialById, updateMaterials } from '../../actions/material-action';

export default function DialogMaterial({
  setOpenDialog, openDialog, materialToUpdate, setRefresh, refresh,
}) {
  const [materialInfo, setMaterialInfo] = useState({});
  // DAta a enviar
  const [nameMaterial, setNameMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [reference, setReference] = useState('');
  const [brand, setBrand] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      nameMaterial(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'reference') {
      setReference(value);
    }
    if (name === 'category') {
      setCategory(value);
    }
    if (name === 'brand') {
      setBrand(value);
    }
  };

  useEffect(() => {
    const getMaterialByIdAsync = async () => {
      const materialData = await getMaterialById(materialToUpdate);
      debugger;
      setMaterialInfo(materialData.data);
      setNameMaterial(materialData.data.name);
      setDescription(materialData.data.description);
      setReference(materialData.data.reference);
      setCategory(materialData.data.category);
      setBrand(materialData.data.brand);
    };
    getMaterialByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updateRolsAsync = async () => {
      const dataUpdate = await updateMaterials(materialToUpdate, {
        name: nameMaterial, description, reference, category, brand,
      });
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
                id="name"
                label="Nombre"
                name="name"
                value={nameMaterial}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Descripcion"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="reference"
                label="Referencia"
                id="reference"
                value={reference}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="category"
                required
                fullWidth
                id="category"
                label="Categoria"
                value={category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="brand"
                label="Marca"
                name="brand"
                value={brand}
                onChange={handleChange}
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
