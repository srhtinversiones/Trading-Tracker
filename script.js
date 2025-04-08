const form = document.getElementById("trade-form");
const tableBody = document.querySelector("#trade-table tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Array.from(form.elements).slice(0, -1).map(el => el.value);
  const row = document.createElement("tr");
  data.forEach(value => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  tableBody.appendChild(row);
  form.reset();
});