let pagos = [];

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const monto = parseFloat(document.getElementById('monto').value);
    const descripcion = document.getElementById('descripcion').value.trim();

    if (nombre && monto && descripcion) {
        const nuevoPago = {
            nombre,
            monto,
            descripcion,
            fecha: new Date().toLocaleString()
        };

        pagos.push(nuevoPago);
        mostrarPagos();
        calcularBalance();

        document.getElementById('paymentForm').reset();
    }
});

function mostrarPagos() {
    const lista = document.getElementById('paymentList');
    lista.innerHTML = '';

    pagos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    pagos.forEach(pago => {
        const item = document.createElement('li');
        item.textContent = `${pago.fecha} - ${pago.nombre} pagó €${pago.monto}: ${pago.descripcion}`;
        lista.appendChild(item);
    });
}

function calcularBalance() {
    const totalPagos = {};
    pagos.forEach(pago => {
        if (!totalPagos[pago.nombre]) {
            totalPagos[pago.nombre] = 0;
        }
        totalPagos[pago.nombre] += pago.monto;
    });

    const nombres = Object.keys(totalPagos);
    if (nombres.length === 2) {
        const [persona1, persona2] = nombres;
        const diferencia = (totalPagos[persona1] - totalPagos[persona2]) / 2;

        if (diferencia > 0) {
            document.getElementById('balanceSummary').textContent = `${persona2} debe €${Math.abs(diferencia.toFixed(2))} a ${persona1}`;
        } else if (diferencia < 0) {
            document.getElementById('balanceSummary').textContent = `${persona1} debe €${Math.abs(diferencia.toFixed(2))} a ${persona2}`;
        } else {
            document.getElementById('balanceSummary').textContent = '¡Todo está equilibrado!';
        }
    } else {
        document.getElementById('balanceSummary').textContent = 'Agrega pagos de ambas personas para calcular el balance.';
    }
}