
let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

const form = document.getElementById('trade-form');
const tablaBody = document.querySelector('#tabla tbody');

form.addEventListener('submit', e => {
    e.preventDefault();
    const datos = {
        fecha: document.getElementById('fecha').value,
        par: document.getElementById('par').value,
        tipo: document.getElementById('tipo').value,
        entrada: document.getElementById('entrada').value,
        salida: document.getElementById('salida').value,
        comision: document.getElementById('comision').value,
        apalancamiento: document.getElementById('apalancamiento').value,
        resultado: document.getElementById('resultado').value
    };
    operaciones.push(datos);
    localStorage.setItem('operaciones', JSON.stringify(operaciones));
    form.reset();
    renderTabla();
});

function renderTabla() {
    tablaBody.innerHTML = "";
    operaciones.forEach((op, i) => {
        const fila = document.createElement('tr');
        Object.values(op).forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            fila.appendChild(td);
        });
        const tdAccion = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = "Eliminar";
        btn.onclick = () => eliminar(i);
        tdAccion.appendChild(btn);
        fila.appendChild(tdAccion);
        tablaBody.appendChild(fila);
    });
}

function eliminar(index) {
    operaciones.splice(index, 1);
    localStorage.setItem('operaciones', JSON.stringify(operaciones));
    renderTabla();
}

function borrarTodo() {
    if (confirm("¿Estás seguro de borrar todos los datos?")) {
        operaciones = [];
        localStorage.removeItem('operaciones');
        renderTabla();
    }
}

function exportarExcel() {
    const tabla = document.getElementById('tabla');
    let csv = '';
    for (let row of tabla.rows) {
        let cols = Array.from(row.cells).map(cell => cell.innerText);
        csv += cols.join(",") + "\n";
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operaciones.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportarPDF() {
    window.print();
}

renderTabla();
