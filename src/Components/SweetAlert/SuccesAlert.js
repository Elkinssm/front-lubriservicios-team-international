import React from 'react';
import Swal from 'sweetalert2';

function SuccesAlert() {
  return (
    <div>
      Swal.fire(
      'Registro',
      'Registro creado correctamente',
      'success',
      );
    </div>
  );
}

export default SuccesAlert;
