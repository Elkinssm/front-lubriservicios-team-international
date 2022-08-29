import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
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
import { deleteMaterials, getAllMaterials, updateMaterials } from '../../actions/material-action';
import DialogMaterial from './DialogMaterial';

export default function MaterialAccordion() {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [materialToUpdate, setMaterialToUpdate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const id = IdKey.generate();

  useEffect(() => {
    const allMaterials = async () => {
      const response = await getAllMaterials();
      console.log(response.data);
      setMaterials(response.data);
    };
    allMaterials();
  }, [refresh]);

  const onOpenDialog = (materialId) => {
    setMaterialToUpdate(materialId);
    setOpenDialog(true);
  };

  const onDelete = (materialId) => {
    const deleteUserAsync = async () => {
      const response = await deleteMaterials(materialId);
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
      <DialogMaterial
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        materialToUpdate={materialToUpdate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      )}
      <Typography variant="h5">Listado de materiales</Typography>
      <div style={{ textAlign: 'end' }}>
        <Link to="/dashboard/create-material">
          <Button variant="contained" color="success">
            Crear
          </Button>
        </Link>
      </div>
      {materials.map((material) => (
        <Accordion
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginTop: '20px',
            marginLeft: '15px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#F56607',
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
                  {getValueByKey(material, header)}
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
                  onClick={() => onOpenDialog(material.id)}
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
                  onClick={() => onDelete(material.id)}
                />
              </Tooltip>

            </div>
          </AccordionSummary>
          {/* <AccordionDetails>
            <div>
              <Grid container spacing={3}>
                {material.vehicle.map((car) => (
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

              </Grid>
            </div>
          </AccordionDetails> */}
        </Accordion>
      ))}
    </>
  );
}
