/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary,
  Button,
  Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpandMoreOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as IdKey from 'short-uuid';
import { Link } from 'react-router-dom';
import { headers } from './models';
import { deleteRols, getRols } from '../../actions/rol-action';
import DialogRol from './DialogRol';

export default function RolAccordion() {
  const [rols, setRols] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rolToUpdate, setRolToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const id = IdKey.generate();

  useEffect(() => {
    const allRols = async () => {
      const response = await getRols();
      console.log(response.data);
      setRols(response.data);
    };
    allRols();
  }, [refresh]);

  const onOpenDialog = (rolId) => {
    setRolToUpdate(rolId);
    setOpenDialog(true);
  };

  const onDelete = (rolId) => {
    const deleteUserAsync = async () => {
      const response = await deleteRols(rolId);
      console.log(response.data);
      setRefresh(!refresh);
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
      <DialogRol
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        rolToUpdate={rolToUpdate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      )}
      <Typography variant="h5">Listado de roles</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/dashboard/create-rol">
          <Button variant="contained" color="success">
            Crear
          </Button>
        </Link>
      </div>
      {rols.map((rol) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
            marginLeft: '15px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#FF1408',
            borderLeftWidth: '8px',
          }}
        >
          <AccordionSummary
            aria-controls="panel1c-content"
            id={id}
            expandIcon={<ExpandMoreOutlined />}
          >
            {headers.initialHeaders.map((header) => (
              <div style={{ flexBasis: '40%' }}>
                <Typography variant="h6">
                  {header.title}
                </Typography>
                <Typography
                  style={{
                    color: '#08090b',
                  }}
                  variant="subtitle1"
                >
                  {getValueByKey(rol, header)}
                </Typography>
              </div>
            ))}
            <div style={{ flexBasis: '28%', paddingTop: 8 }}>
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
                  onClick={() => onOpenDialog(rol.id)}
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
                  onClick={() => onDelete(rol.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
        </Accordion>
      ))}

    </>
  );
}
