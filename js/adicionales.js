document.addEventListener('DOMContentLoaded', () => {
    const carritoContenido = document.getElementById('carrito-contenido');

    // Productos disponibles con sus imágenes, máximos y mensajes de advertencia
    const productos = {
        'Cabeza de Coco': { img: 'imgs/webp/productos/1.webp', max: 1, mensaje: 'Solo tenemos 1 cabeza de coco :(' },
        'Dibujitos': { img: 'imgs/webp/productos/2.webp', max: 4, mensaje: 'Solo tenemos 4 dibujitos :(' },
        'Mesas': { img: 'imgs/webp/productos/3.webp', max: 15 },
        'Sillas': { img: 'imgs/webp/productos/4.webp', max: 15 },
        'Transporte': { img: 'imgs/webp/productos/5.webp', max: 15 }
    };

    // Cargar productos del localStorage
    const cargarCarrito = () => {
        carritoContenido.innerHTML = '';

        const tematicaCarrito = localStorage.getItem('tematica');
        if (tematicaCarrito) {
            carritoContenido.innerHTML += `<div class="carrito-item"><h4>Temática Seleccionada: ${tematicaCarrito}</h4></div>`;
        }

        Object.keys(productos).forEach(producto => {
            const cantidad = parseInt(localStorage.getItem(producto)) || 0;
            if (cantidad > 0) {
                carritoContenido.innerHTML += `
                    <div class="carrito-item">
                        <img src="${productos[producto].img}" alt="${producto}">
                        <h4>${producto}</h4>
                        <div class="cantidad">
                            <button class="btn-decrementar" data-producto="${producto}">-</button>
                            <input type="number" value="${cantidad}" min="0" max="${productos[producto].max}" data-producto="${producto}" class="cantidad-input">
                            <button class="btn-incrementar" data-producto="${producto}">+</button>
                        </div>
                        <button class="btn-eliminar" data-producto="${producto}">Eliminar</button>
                    </div>
                `;
            }
        });
        agregarEventosBotones();
    };

    const agregarEventosBotones = () => {
        document.querySelectorAll('.btn-decrementar').forEach(btn => btn.addEventListener('click', cambiarCantidad));
        document.querySelectorAll('.btn-incrementar').forEach(btn => btn.addEventListener('click', cambiarCantidad));
        document.querySelectorAll('.cantidad-input').forEach(input => input.addEventListener('change', actualizarCantidad));
        document.querySelectorAll('.btn-eliminar').forEach(btn => btn.addEventListener('click', eliminarProducto));
    };

    const cambiarCantidad = (e) => {
        const producto = e.target.dataset.producto;
        const input = document.querySelector(`input[data-producto="${producto}"]`);
        let cantidad = parseInt(input.value);
        const cantidadGuardada = parseInt(localStorage.getItem(producto)) || 0;
        if (e.target.classList.contains('btn-incrementar') && cantidad < productos[producto].max) {
            if (cantidadGuardada < productos[producto].max) {
                cantidad++;
            } else {
                alert('No puedes agregar más de este producto al carrito.');
                return;
            }
        } else if (e.target.classList.contains('btn-decrementar') && cantidad > 0) {
            cantidad--;
        }
        input.value = cantidad;
        localStorage.setItem(producto, cantidad);
        if (cantidad === productos[producto].max && productos[producto].mensaje) {
            alert(productos[producto].mensaje);
        }
        if (cantidad === 0) eliminarProducto(e);
    };

    const actualizarCantidad = (e) => {
        const producto = e.target.dataset.producto;
        let cantidad = parseInt(e.target.value);
        if (isNaN(cantidad) || cantidad < 0) cantidad = 0;
        if (cantidad > productos[producto].max) {
            cantidad = productos[producto].max;
            if (productos[producto].mensaje) {
                alert(products[producto].mensaje);
            }
        }
        e.target.value = cantidad;
        localStorage.setItem(producto, cantidad);
        if (cantidad === 0) eliminarProducto(e);
    };

    const eliminarProducto = (e) => {
        const producto = e.target.dataset.producto;
        localStorage.removeItem(producto);
        cargarCarrito();
    };

    cargarCarrito();
});
