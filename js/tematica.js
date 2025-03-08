// Función para agregar la temática al carrito
function agregarAlCarrito() {
    // Verificar cuál radio button está seleccionado
    const seleccion = document.querySelector('input[name="size"]:checked');
    
    if (seleccion) {
        // Si se ha seleccionado una opción, se guarda en el localStorage
        const tematicaSeleccionada = seleccion.value;
        localStorage.setItem('tematica', tematicaSeleccionada);

        // Opcionalmente, podrías redirigir a otra página o mostrar un mensaje
        alert(`${tematicaSeleccionada} ha sido añadida al carrito.`);
        window.location.href = 'adicionales.html'; // Redirige a la página del carrito
    } else {
        // Si no se ha seleccionado ninguna opción, mostrar un mensaje
        alert("Por favor, selecciona una temática.");
    }
}

