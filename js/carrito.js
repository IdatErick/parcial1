// Recibir el valor del carrito desde el localStorage
window.onload = function() {
    const tematicaCarrito = localStorage.getItem('tematica');
    if (tematicaCarrito) {
        console.log('Temática en el carrito:', tematicaCarrito);
        // Aquí puedes mostrar la temática en el carrito o realizar alguna otra acción
    }
}