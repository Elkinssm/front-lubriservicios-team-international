import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import background from '../images/Amarillo.svg';
import { getAllUsers } from '../../actions/user-action';

export default function MechanicCard() {
  const [mechanic, setMechanic] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      const mechanicData = response.data.filter((x) => x.rol.name === 'Mechanic');
      setMechanic(mechanicData[0]);
    };
    allUsers();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, backgroundImage: `url(${background})` }} style={{ margin: 'auto' }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <BuildCircleIcon />
          </Avatar>
        )}
        title="Mecanico Lubriservicios"
      />

      <CardContent>
        <Typography variant="body2">
          Nombre:
          {' '}
          {mechanic?.name}
        </Typography>
        <Typography variant="body2">
          Telefono:
          {' '}
          {mechanic?.cellPhone}
        </Typography>
        <Typography variant="body2">
          Correo:
          {' '}
          {mechanic?.email}
        </Typography>
        <Typography variant="caption">
          Si necesita ayuda contactelo
        </Typography>
      </CardContent>

    </Card>
  );
}
