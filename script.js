const form = document.getElementById('operationForm');
const operationsTable = document.getElementById('operationsTable');
const tbody = operationsTable.querySelector('tbody');

// Cargar operaciones guardadas
window.onload = function () {
  const savedData = localStorage.getItem('trading_operations');
  if (savedData) {
    tbody.innerHTML = savedData;
  }
};

// Guardar automáticamente cada vez que se agrega una operación
function saveOperations() {
  localStorage.setItem('trading_operations', tbody.innerHTML);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const asset = document.getElementById('asset').value;
  const entry = document.getElementById('entry').value;
  const exit = document.getElementById('exit').value;
  const leverage = document.getElementById('leverage').value;
  const commission = document.getElementById('commission').value;

  const result = ((exit - entry) * leverage - commission).toFixed(2);

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${asset}</td>
    <td>${entry}</td>
    <td>${exit}</td>
    <td>${leverage}</td>
    <td>${commission}</td>
    <td>${result}</td>
  `;

  tbody.appendChild(row);
  saveOperations();
  form.reset();
});
// Botón para borrar todo
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', function () {
  if (confirm("¿Estás seguro de que querés borrar todas las operaciones?")) {
    localStorage.removeItem('trading_operations');
    tbody.innerHTML = '';
  }
});