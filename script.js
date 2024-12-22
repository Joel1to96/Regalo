// Configura la fecha de lanzamiento
const releaseDate = new Date('February 4, 2025 00:00:00').getTime();

// Actualiza el contador cada segundo
const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    // Cálculos para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Muestra el resultado
    document.getElementById("countdown").innerHTML = `
        Falta:
        ${days}d ${hours}h ${minutes}m ${seconds}s
    `;

    // Si la cuenta llega a cero, muestra un mensaje
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "¡Ya está disponible!";
    }
}, 1000);