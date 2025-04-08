const form = document.getElementById("trade-form");
const tableBody = document.querySelector("#data-table tbody");
const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportExcel");

// Cargar datos almacenados
document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("trades")) || [];
  storedData.forEach(addRow);
});

// Guardar operación
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  addRow(data);
  saveToStorage();
  form.reset();
});

// Agregar fila
function addRow(data) {
  const row = document.createElement("tr");

  for (let key of ["fecha", "pair", "tipo", "entrada", "salida", "comision", "apalancamiento", "resultado"]) {
    const cell = document.createElement("td");
    cell.textContent = data[key];
    row.appendChild(cell);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.style.background = "tomato";
  deleteBtn.style.color = "#fff";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "6px";
  deleteBtn.style.padding = "4px 8px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.onclick = () => {
    row.remove();
    saveToStorage();
  };

  const actionCell = document.createElement("td");
  actionCell.appendChild(deleteBtn);
  row.appendChild(actionCell);

  tableBody.appendChild(row);
}

// Guardar en LocalStorage
function saveToStorage() {
  const rows = tableBody.querySelectorAll("tr");
  const data = Array.from(rows).map(row => {
    const cells = row.querySelectorAll("td");
    return {
      fecha: cells[0].textContent,
      pair: cells[1].textContent,
      tipo: cells[2].textContent,
      entrada: cells[3].textContent,
      salida: cells[4].textContent,
      comision: cells[5].textContent,
      apalancamiento: cells[6].textContent,
      resultado: cells[7].textContent,
    };
  });
  localStorage.setItem("trades", JSON.stringify(data));
}

// Borrar todo
clearBtn.addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas borrar todas las operaciones?")) {
    tableBody.innerHTML = "";
    localStorage.removeItem("trades");
  }
});

// Exportar a Excel
exportBtn.addEventListener("click", () => {
  const wb = XLSX.utils.book_new();
  const ws_data = [
    ["Fecha", "Par", "Tipo", "Entrada", "Salida", "Comisión", "Apalancamiento", "Resultado"],
    ...Array.from(tableBody.querySelectorAll("tr")).map(row =>
      Array.from(row.querySelectorAll("td")).slice(0, 8).map(td => td.textContent)
    )
  ];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Operaciones");
  XLSX.writeFile(wb, "operaciones_trading.xlsx");
});
