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
  // Reiniciar selects de TomSelect
  document.querySelector('#par').tomselect.clear();
  document.querySelector('#tipo').tomselect.clear();
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

const paresTrading = [
  "BTC/USDT", "ETH/USDT", "XRP/USDT", "DOGE/USDT", "SOL/USDT", "ADA/USDT", "DOT/USDT", "LTC/USDT", "LINK/USDT",
  "SHIB/USDT", "XMR/USDT", "TON/USDT", "AVAX/USDT", "XLM/USDT", "UNI/USDT", "BCH/USDT", "VET/USDT", "MATIC/USDT",
  "ATOM/USDT", "ALGO/USDT", "FTM/USDT", "EOS/USDT", "XTZ/USDT", "SAND/USDT", "CAKE/USDT", "FLOW/USDT", "GALA/USDT",
  "MKR/USDT", "QNT/USDT", "GRT/USDT", "LDO/USDT", "IMX/USDT", "STX/USDT", "INJ/USDT", "RUNE/USDT", "SNX/USDT",
  "AAVE/USDT", "KAVA/USDT", "NEAR/USDT", "FIL/USDT", "HBAR/USDT", "CHZ/USDT", "CRV/USDT", "ENJ/USDT", "ZIL/USDT",
  "DYDX/USDT", "COMP/USDT", "BAT/USDT", "1INCH/USDT", "ANKR/USDT", "HOT/USDT", "CELR/USDT", "SUSHI/USDT", "YFI/USDT",
  "BAL/USDT", "BNT/USDT", "OMG/USDT", "LRC/USDT", "ICX/USDT", "ZRX/USDT", "KNC/USDT", "REN/USDT", "STORJ/USDT",
  "CVC/USDT", "MTL/USDT", "NMR/USDT", "OCEAN/USDT", "UMA/USDT", "BAND/USDT", "RLC/USDT", "PAXG/USDT", "GNO/USDT",
  "REP/USDT", "MANA/USDT", "WAVES/USDT", "QTUM/USDT", "ONT/USDT", "DASH/USDT", "ZEC/USDT", "XEM/USDT", "ETC/USDT",
  "THETA/USDT", "KSM/USDT", "EGLD/USDT", "HNT/USDT", "AR/USDT", "ROSE/USDT", "CELO/USDT", "MINA/USDT", "KDA/USDT",
  "FLUX/USDT", "GLMR/USDT", "ASTR/USDT", "ACA/USDT", "MOVR/USDT", "CSPR/USDT", "VLX/USDT", "SCRT/USDT", "IOST/USDT",
  "ELF/USDT", "STPT/USDT", "COTI/USDT", "DGB/USDT", "VTHO/USDT", "TFUEL/USDT"
];

// Insertar pares en el select
const parSelect = document.getElementById("par");
paresTrading.forEach(par => {
  const option = document.createElement("option");
  option.value = par;
  option.textContent = par;
  parSelect.appendChild(option);
});

// Activar TomSelect en los dos selects
new TomSelect("#par", {
  create: false,
  sortField: {
    field: "text",
    direction: "asc"
  },
  placeholder: "Buscar par de trading..."
});

new TomSelect("#tipo", {
  create: false,
  placeholder: "Selecciona tipo de operación..."
});

