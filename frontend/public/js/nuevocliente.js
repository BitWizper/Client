document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("nuevo-cliente-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const clienteData = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            email: form.email.value,
            telefono: form.telefono.value,
            direccion: form.direccion.value,
            comida_favorita: form['comida-favorita'].value,
            descuento_navideno: form['descuento-navideno'].value
        };

        try {
            const response = await fetch('https://client-9dq3.onrender.com/api/cliente/crearclientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteData)
            });

            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
            
            alert('Cliente registrado exitosamente');
            location.href = 'clientes.html'; // Regresa a la página principal
        } catch (error) {
            console.error("Error al registrar cliente:", error);
            alert("Hubo un error al registrar el cliente.");
        }
    });
});
