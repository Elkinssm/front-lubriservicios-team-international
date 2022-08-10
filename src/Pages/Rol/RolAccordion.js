/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Grid,
  Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpandMoreOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as IdKey from 'short-uuid';
import { getAllByRole } from '@testing-library/react';
import { headers } from './models';
import { deleteRols, getRols, updateRols } from '../../actions/rol-action';

export default function RolAccordion() {
  const [rols, setRols] = useState([]);
  const id = IdKey.generate();

  useEffect(() => {
    const allRols = async () => {
      const response = await getRols();
      console.log(response.data);
      setRols(response.data);
    };
    allRols();
  }, []);

  const onEdit = () => {
    const updateUserAsync = async () => {
      const response = await updateRols(id);
      console.log(response.data);
    };
    updateUserAsync();
  };

  const onDelete = (id) => {
    const deleteUserAsync = async () => {
      const response = await deleteRols(id);
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
      <Typography variant="h5">Listado de roles</Typography>
      {rols.map((rol) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
          }}
        >
          <AccordionSummary
            aria-controls="panel1c-content"
            id={id}
            expandIcon={<ExpandMoreOutlined />}
          >
            {headers.initialHeaders.map((header) => (
              <div>
                <Typography>
                  {header.title}
                </Typography>
                <Typography>
                  {getValueByKey(rol, header)}
                </Typography>
              </div>
            ))}
            <div>
              <Tooltip title="Ver detalle" arrow placement="top">
                <VisibilityIcon />
              </Tooltip>
              &nbsp;&nbsp;

              <Tooltip title="Editar" arrow placement="top">
                <EditIcon
                  onClick={() => onEdit(rol.id)}
                />
              </Tooltip>

              &nbsp;&nbsp;

              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
                  onClick={() => onDelete(rol.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
          {/* <AccordionDetails>
            <div>
              <Grid container spacing={3}>
                {car.user.map((info) => (
                  <Grid item xs={2}>
                    <Typography>
                      Nombre
                    </Typography>
                    <Typography>
                      {info.name}
                    </Typography>
                    <Typography>
                      Celular
                    </Typography>
                    <Typography>
                      {info.cellPhone}
                    </Typography>
                  </Grid>
                ))}

              </Grid>
            </div>
          </AccordionDetails> */}
        </Accordion>
      ))}
    </>
  );
}
