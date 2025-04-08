
const form = document.getElementById('form');
const tabla = document.querySelector('#tabla tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    fecha: document.getElementById('fecha').value,
    par: document.getElementById('par').value,
    tipo: document.getElementById('tipo').value,
    entrada: document.getElementById('entrada').value,
    salida: document.getElementById('salida').value,
    comision: document.getElementById('comision').value,
    apalancamiento: document.getElementById('apalancamiento').value,
    resultado: document.getElementById('resultado').value,
  };

  const fila = document.createElement('tr');
  for (let key in data) {
    const celda = document.createElement('td');
    celda.textContent = data[key];
    fila.appendChild(celda);
  }

  const borrarBtn = document.createElement('button');
  borrarBtn.textContent = 'Borrar';
  borrarBtn.onclick = () => fila.remove();
  const celdaAccion = document.createElement('td');
  celdaAccion.appendChild(borrarBtn);
  fila.appendChild(celdaAccion);
  tabla.appendChild(fila);

  form.reset();
});

function borrarTodo() {
  tabla.innerHTML = '';
}

function exportarExcel() {
  alert("Funcionalidad de exportar a Excel pendiente");
}

function exportarPDF() {
  alert("Funcionalidad de exportar a PDF pendiente");
}
