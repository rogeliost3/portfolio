document.addEventListener("DOMContentLoaded", () => {
    // Cargar el menú de navegación
    fetch("./headerMenu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;
            marcarElementoActivo();
        })
        .catch(error => console.error("Error cargando el menú:", error));

    // Cargar el pie de pagina
    fetch("./footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-container").innerHTML = data;
    })
    .catch(error => console.error("Error cargando el pie de página:", error));
});

// Función para marcar el elemento activo según la página actual
function marcarElementoActivo() {
    const currentPage = document.body.dataset.page; // Tomamos el atributo data-page del body
    const links = document.querySelectorAll("#menu li");
    
    links.forEach(item => {
        const link = item.querySelector("a"); // Obtener el <a> dentro del <li>
        
        if (link && link.dataset.page === currentPage) {
            item.classList.add("active"); // Agregar clase activa al <li>
        } else {
            item.classList.remove("active");
        }
    });
}

//evitar el zoom con los dedos en movil,TODO probarlo si touch-action: pan-y; no funciona
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
    e.preventDefault();
});
