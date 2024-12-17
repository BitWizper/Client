document.addEventListener("DOMContentLoaded", () => {
    const tablaClientes = document.querySelector("table tbody");
    const buscarClienteBtn = document.querySelector("#buscar-cliente-btn");
    const buscarIdInput = document.querySelector("#buscar-id");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    let clientes = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    const apiUrl = 'https://client-9dq3.onrender.com/api/cliente'; // Base URL para las solicitudes

    // Función para obtener clientes
    async function obtenerClientes() {
        try {
            const response = await fetch(`${apiUrl}/obtclientes`);
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            clientes = await response.json();
            renderPage(currentPage);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            tablaClientes.innerHTML = `<tr><td colspan="9">Error al cargar clientes: ${error.message}</td></tr>`;
        }
    }

    // Función para mostrar clientes en la tabla
    function mostrarClientes(pageItems) {
        if (!pageItems || pageItems.length === 0) {
            tablaClientes.innerHTML = '<tr><td colspan="9">No hay clientes para mostrar.</td></tr>';
            return;
        }

        tablaClientes.innerHTML = pageItems.map(cliente => `
            <tr>
                <td>${cliente.id_cliente || "ID no disponible"}</td>
                <td>${cliente.nombre || "Nombre no disponible"}</td>
                <td>${cliente.apellido || "Apellido no disponible"}</td>
                <td>${cliente.email || "Email no disponible"}</td>
                <td>${cliente.telefono || "Teléfono no disponible"}</td>
                <td>${cliente.direccion || "Dirección no disponible"}</td>
                <td>${cliente.comida_favorita || "Comida no disponible"}</td>
                <td>${cliente.descuento_navideno || "Descuento no disponible"}</td>
                <td>
                    <button class="eliminar-btn" data-id="${cliente.id_cliente}">Eliminar</button>
                    <button class="editar-btn" data-id="${cliente.id_cliente}">Editar</button>
                </td>
            </tr>
        `).join("");

        // Añadir eventos
        document.querySelectorAll(".eliminar-btn").forEach(btn => {
            btn.addEventListener("click", () => eliminarCliente(btn.dataset.id));
        });

        document.querySelectorAll(".editar-btn").forEach(btn => {
            btn.addEventListener("click", () => editarCliente(btn.dataset.id));
        });
    }

    // Paginación
    function renderPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = clientes.slice(start, end);

        mostrarClientes(pageItems);
        pageInfo.textContent = `Página ${page}`;
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = end >= clientes.length;
    }

    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) renderPage(--currentPage);
    });

    nextPageBtn.addEventListener("click", () => {
        if (currentPage * itemsPerPage < clientes.length) renderPage(++currentPage);
    });

    // Función para eliminar cliente
    async function eliminarCliente(id) {
        try {
            const response = await fetch(`${apiUrl}/elimclientes/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Error al eliminar cliente: ${response.status}`);
            alert('Cliente eliminado exitosamente');
            obtenerClientes();
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
        }
    }

    // Función para buscar cliente por ID
    async function obtenerClientePorId(id) {
        try {
            const response = await fetch(`${apiUrl}/clientes/${id}`);
            if (!response.ok) throw new Error(`Cliente no encontrado: ${response.status}`);
            const cliente = await response.json();

            // Mostrar solo el cliente encontrado
            mostrarClientes([cliente]);

            // Actualizar la información de la página (fuera de la paginación)
            pageInfo.textContent = `Mostrando resultado para ID: ${id}`;
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
        } catch (error) {
            console.error("Error al buscar cliente:", error);
            tablaClientes.innerHTML = `<tr><td colspan="9">Error: ${error.message}</td></tr>`;
            pageInfo.textContent = `Error: Cliente con ID ${id} no encontrado.`;
            prevPageBtn.disabled = true;
            nextPageBtn.disabled = true;
        }
    }

    // Evento de búsqueda por ID
    buscarClienteBtn?.addEventListener("click", () => {
        const id = buscarIdInput.value;
        if (id) {
            obtenerClientePorId(id);
        } else {
            alert("Por favor, ingresa un ID válido para buscar.");
        }
    });

    // Función para restaurar la lista completa
    function restaurarListaCompleta() {
        buscarIdInput.value = ""; // Limpiar el campo de búsqueda
        renderPage(currentPage); // Volver a la página actual de la lista
        pageInfo.textContent = `Página ${currentPage}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage * itemsPerPage >= clientes.length;
    }

    // Agregar un evento para restaurar la lista completa al limpiar el campo de búsqueda
    buscarIdInput.addEventListener("input", () => {
        if (!buscarIdInput.value) {
            restaurarListaCompleta();
        }
    });

    // Función para editar cliente
    async function editarCliente(id) {
        try {
            // Obtener los datos actuales del cliente
            const response = await fetch(`${apiUrl}/clientes/${id}`);
            if (!response.ok) throw new Error(`Error al obtener cliente: ${response.status}`);
            const cliente = await response.json();

            // Crear formulario emergente para editar
            const formHtml = `
                <form id="editar-form" style="display: flex; flex-direction: column; gap: 10px;">
                    <label>Nombre: <input type="text" id="nombre" value="${cliente.nombre || ''}" /></label>
                    <label>Apellido: <input type="text" id="apellido" value="${cliente.apellido || ''}" /></label>
                    <label>Email: <input type="email" id="email" value="${cliente.email || ''}" /></label>
                    <label>Teléfono: <input type="text" id="telefono" value="${cliente.telefono || ''}" /></label>
                    <label>Dirección: <input type="text" id="direccion" value="${cliente.direccion || ''}" /></label>
                    <label>Comida Favorita: <input type="text" id="comida" value="${cliente.comida_favorita || ''}" /></label>
                    <label>Descuento Navideño: <input type="text" id="descuento" value="${cliente.descuento_navideno || ''}" /></label>
                    <button type="submit">Guardar Cambios</button>
                </form>
            `;

            const modal = document.createElement('div');
            modal.id = 'editar-modal';
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
            `;
            modal.innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 5px; width: 300px;">
                    <h3>Editar Cliente</h3>
                    ${formHtml}
                    <button id="cerrar-modal" style="margin-top: 10px;">Cancelar</button>
                </div>
            `;

            document.body.appendChild(modal);

            // Evento para cerrar el modal
            document.getElementById('cerrar-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            // Evento para guardar cambios
            document.getElementById('editar-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const datosActualizados = {
                    nombre: document.getElementById('nombre').value,
                    apellido: document.getElementById('apellido').value,
                    email: document.getElementById('email').value,
                    telefono: document.getElementById('telefono').value,
                    direccion: document.getElementById('direccion').value,
                    comida_favorita: document.getElementById('comida').value,
                    descuento_navideno: document.getElementById('descuento').value
                };

                try {
                    const updateResponse = await fetch(`${apiUrl}/actclientes/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosActualizados)
                    });

                    if (!updateResponse.ok) throw new Error(`Error al actualizar cliente: ${updateResponse.status}`);
                    alert('Cliente actualizado exitosamente');
                    document.body.removeChild(modal);
                    obtenerClientes(); // Recargar lista de clientes
                } catch (error) {
                    console.error("Error al actualizar cliente:", error);
                    alert('Error al actualizar cliente.');
                }
            });
        } catch (error) {
            console.error("Error al editar cliente:", error);
        }
    }

    // Inicialización
    obtenerClientes();
});
