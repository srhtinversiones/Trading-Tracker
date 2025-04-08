const form = document.getElementById("trade-form");
const table = document.getElementById("data-table").getElementsByTagName("tbody")[0];
const exportBtn = document.getElementById("exportExcel");
const clearBtn = document.getElementById("clearBtn");

// Cargar datos guardados
document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("trades")) || [];
  savedData.forEach((row) => addRowToTable(row));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  addRowToTable(data);
  saveData();
  form.reset();
});

function addRowToTable(data) {
  const row = table.insertRow();
  Object.values(data).forEach((value) => {
    const cell = row.insertCell();
    cell.textContent = value;
  });

  const deleteCell = row.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.style.cssText = "background-color: tomato; color: white; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer;";
  deleteBtn.onclick = () => {
    row.remove();
    saveData();
  };
  deleteCell.appendChild(deleteBtn);
}

function saveData() {
  const rows = Array.from(table.rows).map((row) => {
    return Array.from(row.cells).slice(0, -1).reduce((acc, cell, index) => {
      const keys = ["fecha", "pair", "tipo", "entrada", "salida", "comision", "apalancamiento", "resultado"];
      acc[keys[index]] = cell.textContent;
      return acc;
    }, {});
  });
  localStorage.setItem("trades", JSON.stringify(rows));
}

exportBtn.addEventListener("click", () => {
  const wb = XLSX.utils.book_new();
  const ws_data = [
    ["Fecha", "Par", "Tipo", "Entrada", "Salida", "Comisión", "Apalancamiento", "Resultado"],
    ...Array.from(table.rows).map((row) =>
      Array.from(row.cells).slice(0, -1).map((cell) => cell.textContent)
    ),
  ];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Operaciones");
  XLSX.writeFile(wb, "operaciones_trading.xlsx");
});

clearBtn.addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas borrar todas las operaciones?")) {
    table.innerHTML = "";
    localStorage.removeItem("trades");
  }
});
