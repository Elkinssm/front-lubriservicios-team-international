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
import { headers } from './models';
import { deleteOrders, getAllOrders, updateOrders } from '../../actions/order-action';

export default function OrderAccordion() {
  const [orders, setOrders] = useState([]);
  const id = IdKey.generate();

  useEffect(() => {
    const allOrders = async () => {
      const response = await getAllOrders();
      console.log(response.data);
      setOrders(response.data);
    };
    allOrders();
  }, []);

  const onEdit = () => {
    const updateUserAsync = async () => {
      const response = await updateOrders(id);
      console.log(response.data);
    };
    updateUserAsync();
  };

  const onDelete = (id) => {
    const deleteUserAsync = async () => {
      const response = await deleteOrders(id);
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
      <Typography variant="h5">Listado de ordenes</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/dashboard/create-order">
          <Button variant="contained" color="success">
            Crear
          </Button>
        </Link>
      </div>
      {orders.map((order) => (
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
              <div style={{ flexBasis: '40%' }}>
                <Typography style={{ fontSize: 14 }}>
                  {header.title}
                </Typography>
                <Typography
                  style={{
                    fontSize: 12,
                    color: '#08090b',
                  }}
                >
                  {getValueByKey(order, header)}
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
                  onClick={() => onEdit(order.id)}
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
                  onClick={() => onDelete(order.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
          {/* <AccordionDetails>
            <div>
              <Grid container spacing={3}>
                {order.vehicle.map((car1) => (
                  <Grid item xs={2}>
                    <Typography>
                      Placa
                    </Typography>
                    <Typography>
                      {car.plate}
                    </Typography>
                    <Typography>
                      Marca
                    </Typography>
                    <Typography>
                      {car.brand}
                    </Typography>
                  </Grid>
                ))}

                <Grid item xs={2} />

              </Grid>
            </div>
          </AccordionDetails> */}
        </Accordion>
      ))}
    </>
  );
}
