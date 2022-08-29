import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button,
  Grid,
  Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpandMoreOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as IdKey from 'short-uuid';
import { Link } from 'react-router-dom';
import { deleteUsers, getAllUsers } from '../../actions/user-action';
import { headers } from './models';
import DialogUser from './DialogUser';

export default function UserAccordion() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const id = IdKey.generate();

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      console.log(response.data);
      setUsers(response.data);
    };
    allUsers();
  }, [refresh]);

  const onOpenDialog = (userId) => {
    setUserToUpdate(userId);
    setOpenDialog(true);
  };

  const onDelete = (userId) => {
    const deleteUserAsync = async () => {
      const response = await deleteUsers(userId);
      console.log(response.data);
    };
    deleteUserAsync();
  };

  const getValueByKey = (object, header) => {
    if (header.child === null) {
      if (header.field) {
        let result = '';
        if (header.field.includes(',')) {
          header.field.split(/\s*,\s*/).forEach((myString) => {
            result += `${object[myString]} `;
          });
          return result;
        }
        return object[header.field];
      }
      return '';
    }
    return object[header.field] !== null
      ? object[header.field][header.child]
      : '';
  };

  return (

    <>
      {openDialog
      && (
      <DialogUser
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        userToUpdate={userToUpdate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      )}
      <Typography variant="h5">Listado de usuarios</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/register">
          <Button variant="contained" color="success" style={{ decoration: 'none' }}>
            Crear
          </Button>
        </Link>
      </div>
      {users.map((user) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
            marginLeft: '15px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#9C27B0',
            borderLeftWidth: '8px',
          }}
        >
          <AccordionSummary
            aria-controls="panel1c-content"
            id={id}
            expandIcon={<ExpandMoreOutlined />}
          >
            {headers.initialHeaders.map((header) => (
              <div style={{ flexBasis: '39.6%' }}>
                <Typography variant="h6">
                  {header.title}
                </Typography>
                <Typography
                  style={{
                    color: '#08090b',
                  }}
                  variant="subtitle1"
                >
                  {getValueByKey(user, header)}
                </Typography>
              </div>
            ))}
            <div style={{ flexBasis: '24%', paddingTop: 8 }}>
              <Tooltip title="Ver detalle" arrow placement="top">
                <VisibilityIcon
                  style={{
                    verticalAlign: 'bottom',
                    height: 20,
                    width: 20,
                  }}
                />
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip title="Editar" arrow placement="top">
                <EditIcon
                  style={{
                    verticalAlign: 'bottom',
                    height: 20,
                    width: 20,
                  }}
                  onClick={() => onOpenDialog(user.id)}
                />
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
                  style={{
                    verticalAlign: 'bottom',
                    height: 20,
                    width: 20,
                  }}
                  onClick={() => onDelete(user.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Grid container spacing={3}>
                {user.vehicle.map((car) => (
                  <Grid item xs={2} style={{ display: 'flex' }}>
                    <div style={{ flexBasis: '30%', marginLeft: 55 }}>
                      <Typography variant="h6">
                        Placa
                      </Typography>
                      <Typography
                        style={{
                          color: '#08090b',
                        }}
                        variant="subtitle1"
                      >
                        {car.plate}
                      </Typography>
                    </div>
                    <div style={{ flexBasis: '30%', marginLeft: 110 }}>
                      <Typography variant="h6">
                        Marca
                      </Typography>
                      <Typography
                        style={{
                          color: '#08090b',
                        }}
                        variant="subtitle1"
                      >
                        {car.brand}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
