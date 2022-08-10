import React, { useEffect, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import {
  Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllVehicles } from '../../actions/vehicle-action';

export default function MaterialAccordion() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const allVehicles = async () => {
      const response = await getAllVehicles();
      setVehicles(response.data);
    };
    allVehicles();
  }, []);

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
    <div>
      <Accordion>
        <AccordionSummary
          id="panel1-header"
          aria-controls="panel1-content"
          expandIcon={<ExpandMoreOutlined />}
        >
          {vehicles.map((vehicle) => <Typography key={vehicle.id}>{vehicle.plate}</Typography>)}

        </AccordionSummary>

        <AccordionDetails>
          {vehicles.map((vehicle) => <Typography key={vehicle.id}>{vehicle.model}</Typography>)}

        </AccordionDetails>
      </Accordion>
    </div>
  // <div>
  //   <TableContainer component={Paper}>
  //     <Table aria-label="simple table">
  //       <TableHead>
  //         <TableRow align="center">
  //           <TableCell>Id</TableCell>
  //           <TableCell>Placa</TableCell>
  //           <TableCell>Marca</TableCell>
  //           <TableCell>Modelo</TableCell>
  //           <TableCell>Serial chasis</TableCell>
  //           <TableCell>Serial motor</TableCell>
  //           <TableCell>Color</TableCell>
  //           <TableCell>Editar</TableCell>
  //           <TableCell>Eliminar</TableCell>
  //         </TableRow>
  //       </TableHead>

  //       <TableBody>
  //         {vehicles.map((row) => (
  //           <TableRow
  //             key={row.id}
  //             sx={{ '&:last-child td,&:last-child th': { border: 0 } }}
  //             align="center"
  //           >
  //             <TableCell>{row.id}</TableCell>
  //             <TableCell>{row.plate}</TableCell>
  //             <TableCell>{row.brand}</TableCell>
  //             <TableCell>{row.model}</TableCell>
  //             <TableCell>{row.serialChasis}</TableCell>
  //             <TableCell>{row.serialEngine}</TableCell>
  //             <TableCell>{row.color}</TableCell>
  //             <TableCell>
  //               <EditIcon color="info" />
  //             </TableCell>
  //             <TableCell>
  //               <DeleteIcon color="error" />
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // </div>
  );
}
