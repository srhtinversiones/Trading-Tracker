const STORAGE_KEY = "trading_data";
const form = document.getElementById("trade-form");
const tableBody = document.querySelector("#data-table tbody");

function loadData() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  tableBody.innerHTML = "";
  data.forEach((op, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${op.fecha}</td>
      <td>${op.pair}</td>
      <td>${op.tipo}</td>
      <td>${op.entrada}</td>
      <td>${op.salida}</td>
      <td>${op.comision}</td>
      <td>${op.apalancamiento}</td>
      <td>${op.resultado}</td>
      <td><button onclick="deleteOp(${index})">🗑️</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function saveOp(op) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  data.push(op);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  loadData();
}

function deleteOp(index) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  data.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  loadData();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const op = {
    fecha: form.fecha.value,
    pair: form.pair.value,
    tipo: form.tipo.value,
    entrada: form.entrada.value,
    salida: form.salida.value,
    comision: form.comision.value,
    apalancamiento: form.apalancamiento.value,
    resultado: form.resultado.value
  };
  saveOp(op);
  form.reset();
});

loadData();
