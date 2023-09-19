export function deleteProduct(cid, pid) {
    // Realizar una solicitud DELETE al servidor
    fetch(`/api/cart/${cid}/product/${pid}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Product successfully deleted:', data);
        // Aquí puedes actualizar la interfaz de usuario según sea necesario
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  