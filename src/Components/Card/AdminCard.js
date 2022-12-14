import React, { useEffect, useState } from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import background from '../images/Morado.svg';
import { getAllUsers } from '../../actions/user-action';

export default function AdminCard() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers();
      const adminData = response.data.filter((x) => x.rol.name === 'Admin');
      setAdmin(adminData[0]);
    };
    allUsers();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, backgroundImage: `url(${background})` }} style={{ margin: 'auto' }}>
      <CardHeader
        style={{ color: '#ffffff', textAlign: 'center' }}
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <ContactPhoneIcon />
          </Avatar>
        )}
        title="Administrador Lubriservicios"

      />

      <CardContent>
        <Typography variant="body2" color="white">
          Nombre:
          {' '}
          {admin?.name}
        </Typography>
        <Typography variant="body2" color="white">
          Telefono:
          {' '}
          {admin?.cellPhone}
        </Typography>
        <Typography variant="body2" color="white">
          Correo:
          {' '}
          {admin?.email}
        </Typography>

        <Typography variant="caption" color="white">
          Si necesita ayuda contactelo
        </Typography>

      </CardContent>

    </Card>
  );
}
