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
import { deleteWorkType, getAllWorkTypes } from '../../actions/work-type-action';
import DialogWorkType from './DialogWorkType';

export default function WorkTypeAccordion() {
  const [workTypes, setWorkTypes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [workTypeToUpdate, setWorkTypeToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const id = IdKey.generate();

  useEffect(() => {
    const allworkTypes = async () => {
      const response = await getAllWorkTypes();
      console.log(response.data);
      setWorkTypes(response.data);
    };
    allworkTypes();
  }, [refresh]);

  const onOpenDialog = (workTypeId) => {
    setWorkTypeToUpdate(workTypeId);
    setOpenDialog(true);
  };

  const onDelete = (workTypeId) => {
    const deleteWorkTypeAsync = async () => {
      const response = await deleteWorkType(workTypeId);
      console.log(response.data);
    };
    deleteWorkTypeAsync();
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
      <DialogWorkType
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        workTypeToUpdate={workTypeToUpdate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      )}
      <Typography variant="h5">Listado de ordenes de trabajo</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/dashboard/create-work-type">
          <Button variant="contained" color="success" style={{ decoration: 'none' }}>
            Crear
          </Button>
        </Link>
      </div>
      {workTypes.map((worktype) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
            marginLeft: '15px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#634F3E',
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
                  {getValueByKey(worktype, header)}
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
                  onClick={() => onOpenDialog(worktype.id)}
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
                  onClick={() => onDelete(worktype.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
        </Accordion>
      ))}
    </>
  );
}
