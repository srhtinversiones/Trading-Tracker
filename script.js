document.getElementById("exportar-excel").addEventListener("click", () => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(document.getElementById("tabla-operaciones"));
  XLSX.utils.book_append_sheet(wb, ws, "Operaciones");
  XLSX.writeFile(wb, "operaciones.xlsx");
});

document.getElementById("exportar-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Operaciones", 10, 10);
  doc.autoTable({ html: "#tabla-operaciones", startY: 20 });
  doc.save("operaciones.pdf");
});

document.getElementById("borrar-todo").addEventListener("click", () => {
  if (confirm("¿Estás seguro de borrar todos los datos?")) {
    localStorage.clear();
    document.querySelector("#tabla-operaciones tbody").innerHTML = "";
  }
});
