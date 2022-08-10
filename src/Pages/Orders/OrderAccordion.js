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
      {orders.map((order) => (
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
                  {getValueByKey(order, header)}
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
                  onClick={() => onEdit(order.id)}
                />
              </Tooltip>

              &nbsp;&nbsp;

              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
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
