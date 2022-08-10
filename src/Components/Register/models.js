export const documentTypes = [
  {
    key: 'Cedula de ciudadania',
    value: 'Cedula de ciudadania',
  },
  {
    key: 'Pasaporte',
    value: 'Pasaporte',
  },
  {
    key: 'Cedula de extranjeria',
    value: 'Cedula de extranjeria',
  },
];

export const headers = {
  initialHeaders: [
    {
      title: 'Nombre',
      field: 'name',
      child: null,
    },
    {
      title: 'Tipo de documento',
      field: 'documentType',
      child: null,
    },
    {
      title: 'Numero de documento',
      field: 'documentNumber',
      child: null,
    },
    {
      title: 'Numero de celular',
      field: 'cellPhone',
      child: null,
    },
    {
      title: 'Direccion',
      field: 'address',
      child: null,
    },
    {
      title: 'Correo electronico',
      field: 'email',
      child: null,
    },
  ],
  otherHeaders: [
    {
      title: 'Vehiculo',
      field: 'vehicle',
      child: 'plate',
    },
  ],
};
