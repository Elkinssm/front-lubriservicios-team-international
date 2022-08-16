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
import { deleteVehicles, getAllVehicles } from '../../actions/vehicle-action';
import DialogVehicle from './DialogVehicle';

export default function VehicleAccordion() {
  const [vehicles, setVehicles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [vehicleToUpdate, setVehicleToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const id = IdKey.generate();

  useEffect(() => {
    const allVehicles = async () => {
      const response = await getAllVehicles();
      console.log(response.data);
      setVehicles(response.data);
    };
    allVehicles();
  }, [refresh]);

  const onOpenDialog = (vehicleId) => {
    setVehicleToUpdate(vehicleId);
    setOpenDialog(true);
  };

  const onDelete = (vehicleId) => {
    const deleteUserAsync = async () => {
      const response = await deleteVehicles(vehicleId);
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
      <DialogVehicle
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        vehicleToUpdate={vehicleToUpdate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      )}
      <Typography variant="h5">Listado de vehiculos</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/dashboard/create-vehicle" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="success" style={{ decoration: 'none' }}>
            Crear
          </Button>
        </Link>
      </div>

      {vehicles.map((car) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
            marginLeft: '15px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#F5A638',
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
                  {getValueByKey(car, header)}
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
                  onClick={() => onOpenDialog(car.id)}
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
                  onClick={() => onDelete(car.id)}
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
