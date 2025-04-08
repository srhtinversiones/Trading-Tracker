document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("trade-form");
  const tableBody = document.querySelector("#data-table tbody");
  const clearBtn = document.getElementById("clearBtn");
  const exportBtn = document.getElementById("exportExcel");

  // Cargar datos al inicio
  loadData();

  // Guardar operación
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const rowData = {};

    formData.forEach((value, key) => {
      rowData[key] = value;
    });

    addRow(rowData);
    saveData();
    form.reset();
  });

  // Eliminar todos
  clearBtn.addEventListener("click", function () {
    if (confirm("¿Seguro que deseas borrar todas las operaciones?")) {
      localStorage.removeItem("trades");
      tableBody.innerHTML = "";
    }
  });

  // Exportar a Excel
  exportBtn.addEventListener("click", function () {
    const rows = [["Fecha", "Par", "Tipo", "Entrada", "Salida", "Comisión", "Apalancamiento", "Resultado", "Notas"]];
    document.querySelectorAll("#data-table tbody tr").forEach((tr) => {
      const row = Array.from(tr.querySelectorAll("td")).slice(0, 9).map(td => td.textContent);
      rows.push(row);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Operaciones");
    XLSX.writeFile(wb, "operaciones_trading.xlsx");
  });

  // Función para agregar fila
  function addRow(data) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${data.fecha}</td>
      <td>${data.pair}</td>
      <td>${data.tipo}</td>
      <td>${data.entrada}</td>
      <td>${data.salida}</td>
      <td>${data.comision}</td>
      <td>${data.apalancamiento}</td>
      <td>${data.resultado}</td>
      <td>${data.notas || ""}</td>
      <td><button class="deleteBtn">Eliminar</button></td>
    `;

    tableBody.appendChild(tr);
    tr.querySelector(".deleteBtn").addEventListener("click", () => {
      tr.remove();
      saveData();
    });
  }

  // Guardar en localStorage
  function saveData() {
    const data = [];
    document.querySelectorAll("#data-table tbody tr").forEach((tr) => {
      const cells = tr.querySelectorAll("td");
      const row = {
        fecha: cells[0].textContent,
        pair: cells[1].textContent,
        tipo: cells[2].textContent,
        entrada: cells[3].textContent,
        salida: cells[4].textContent,
        comision: cells[5].textContent,
        apalancamiento: cells[6].textContent,
        resultado: cells[7].textContent,
        notas: cells[8].textContent
      };
      data.push(row);
    });

    localStorage.setItem("trades", JSON.stringify(data));
  }

  // Cargar desde localStorage
  function loadData() {
    const stored = localStorage.getItem("trades");
    if (stored) {
      const data = JSON.parse(stored);
      data.forEach(addRow);
    }
  }
});
