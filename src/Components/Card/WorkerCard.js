import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import background from '../images/Azul.svg';
import { getAllUsers } from '../../actions/user-action';

export default function WorkerCard() {
  const [worker, setWorker] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      const workerData = response.data.filter((x) => x.rol.name === 'Worker');
      setWorker(workerData[0]);
    };
    allUsers();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, backgroundImage: `url(${background})` }} style={{ margin: 'auto' }}>
      <CardHeader
        style={{ color: '#ffffff', textAlign: 'center' }}
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <AccountCircleIcon />
          </Avatar>
        )}
        title="Trabajador Lubriservicios"
      />

      <CardContent>
        <Typography variant="body2" color="white">
          Nombre:
          {' '}
          {worker?.name}
        </Typography>
        <Typography variant="body2" color="white">
          Telefono:
          {' '}
          {worker?.cellPhone}
        </Typography>
        <Typography variant="body2" color="white">
          Correo:
          {' '}
          {worker?.email}
        </Typography>
        <Typography variant="caption" color="white">
          Si necesita ayuda contactelo
        </Typography>
      </CardContent>

    </Card>
  );
}
