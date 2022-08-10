/* eslint-disable no-debugger */
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
import { deleteUsers, getAllUsers, updateUsers } from '../../actions/user-action';
import { headers } from './models';

export default function UserAccordion() {
  const [users, setUsers] = useState([]);
  const id = IdKey.generate();

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      console.log(response.data);
      setUsers(response.data);
    };
    allUsers();
  }, []);

  const onEdit = () => {
    const updateUserAsync = async () => {
      const response = await updateUsers(id);
      console.log(response.data);
    };
    updateUserAsync();
  };

  const onDelete = (id) => {
    const deleteUserAsync = async () => {
      const response = await deleteUsers(id);
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
          }}
        >
          <AccordionSummary
            aria-controls="panel1c-content"
            id={id}
            expandIcon={<ExpandMoreOutlined />}
          >
            {headers.initialHeaders.map((header) => (
              <div style={{ flexBasis: '39.6%' }}>
                <Typography style={{ fontSize: 14 }}>
                  {header.title}
                </Typography>
                <Typography
                  style={{
                    fontSize: 12,
                    color: '#08090b',
                  }}
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
                  onClick={() => onEdit(user.id)}
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
                      <Typography style={{ fontSize: 14 }}>
                        Placa
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 12,
                          color: '#08090b',
                        }}
                      >
                        {car.plate}
                      </Typography>
                    </div>
                    <div style={{ flexBasis: '30%', marginLeft: 110 }}>
                      <Typography style={{ fontSize: 14 }}>
                        Marca
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 12,
                          color: '#08090b',
                        }}
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
