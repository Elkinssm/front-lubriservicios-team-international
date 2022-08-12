import * as React from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import background from '../images/Azul.svg';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       minWidth: 320,
//       maxWidth: 500,
//       flexDirection: "column", //change to row for horizontal layout
//       "& .MuiCardHeader-root": {
//         backgroundColor: "yellow"
//       },
//       "& .MuiCardHeader-title": {
//         //could also be placed inside header class
//         backgroundColor: "#FCFCFC"
//       },
//       "& .MuiCardHeader-subheader": {
//         backgroundImage: "linear-gradient(to bottom right, #090977, #00d4ff);"
//       },
//       "& .MuiCardContent-root": {
//         backgroundImage: "linear-gradient(to bottom right, #00d4ff, #00ff1d);"
//       }
//     },
// //skipping a bit
//     header: {},
//     footer: {
//       fontSize: 14,
//       backgroundImage: "linear-gradient(to bottom right, #8c9d9b, #bdcdbf);"
//     }
//   })
// );

export default function AdminCard() {
  return (
    <Card sx={{ maxWidth: 345, backgroundImage: `url(${background})` }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <ContactPhoneIcon />
          </Avatar>
        )}
        title="Administardor Lubriservicios"
        subheader="Si necesita ayuda contactelo"
      />

      <CardContent>

        {/* <Typography variant="h6" color="white">
          Administardor Lubriservicios
        </Typography>
        <Typography variant="subtitle1" color="white">
          Si necesita ayuda contactelo
        </Typography> */}
        <Typography variant="body2" color="white">
          Nombre:
        </Typography>
        <Typography variant="body2" color="white">
          Telefono:
        </Typography>
        <Typography variant="body2" color="white">
          Correo:
        </Typography>
      </CardContent>

    </Card>
  );
}
