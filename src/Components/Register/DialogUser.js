/* eslint-disable no-debugger */
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
import { getUserById, updateUsers } from '../../actions/user-action';
import { documentTypes } from './models';

export default function DialogUser({
  setOpenDialog, openDialog, userToUpdate, setRefresh, refresh,
}) {
  const [userInfo, setUserInfo] = useState({});

  // DAta a enviar
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [password, setPassword] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [address, setAddress] = useState('');
  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setUserName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'cellPhone') {
      setCellPhone(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'documentType') {
      setDocumentType(value);
    }
    if (name === 'documentNumber') {
      setDocumentNumber(value);
    }
    if (name === 'address') {
      setAddress(value);
    }
  };

  const handleChangeSelect = (event) => {
    setDocumentType(event.target.value);
  };

  useEffect(() => {
    const getUserByIdAsync = async () => {
      const userData = await getUserById(userToUpdate);
      debugger;
      setUserInfo(userData.data);
      setUserName(userData.data.name);
      setEmail(userData.data.email);
      setCellPhone(userData.data.cellPhone);
      setPassword(userData.data.password);
      setDocumentType(userData.data.documentType);
      setDocumentNumber(userData.data.documentNumber);
      setAddress(userData.data.address);
    };
    getUserByIdAsync();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updateUserAsync = async () => {
      const dataUpdate = await updateUsers(userToUpdate, {
        name: userName,
        email,
        cellPhone,
        password,
        documentType,
        documentNumber,
        address,
      });
      if (dataUpdate.status >= 200 && dataUpdate.status <= 399) {
        Swal.fire(
          'Registro',
          'Usuario actualizado correctamente',
          'success',
        );
        setOpenDialog(false);
        setRefresh(!refresh);
      }
    };
    updateUserAsync();
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
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="family-name"
                value={userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="cellPhone"
                label="Numero de celular"
                name="cellPhone"
                value={cellPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Tipo de documento</InputLabel>
                <Select
                  labelId="documentType"
                  id="documentType"
                  label="Tipo de documento"
                  onChange={handleChangeSelect}
                  value={documentType}
                >
                  {documentTypes.map((doc) => <MenuItem value={doc.key}>{doc.value}</MenuItem>)}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="documentNumber"
                label="Numero de documento"
                name="documentNumber"
                value={documentNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="address"
                label="Ciudad Residencia"
                name="address"
                value={address}
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
