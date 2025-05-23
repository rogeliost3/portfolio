fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const timeline = document.getElementById("timeline");
    const eraLine = document.getElementById("era-line");

    const years = data.map((e) => e.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const eras = [
      { label: "Prehistoria", start: -Infinity, end: 1999 },
      { label: "Medievo", start: 2000, end: 2008 },
      { label: "Renacimiento", start: 2009, end: 2023 },
      { label: "Actualidad", start: 2024, end: Infinity },
    ];

    eras.forEach((era) => {
      const start = Math.max(
        minYear,
        era.start === -Infinity ? minYear : era.start
      );
      const end = Math.min(maxYear, era.end === Infinity ? maxYear : era.end);
      const span = Math.max(0, end - start + 1);
      if (span > 0) {
        const eraDiv = document.createElement("div");
        eraDiv.className = "era";
        eraDiv.style.flex = span;
        eraDiv.setAttribute("data-label", era.label);
        eraLine.appendChild(eraDiv);
      }
    });

    data.sort((a, b) => a.year - b.year);

    data.forEach((event) => {
      const eventEl = document.createElement("div");
      eventEl.className = "event";
      eventEl.style.flex = 1;

      eventEl.innerHTML = `
      <div class="event-point">
        <div class="event-year">${event.year}</div>
        <div class="event-circle"></div>
        <div class="event-line"></div>
      </div>
      <img class="event-image" src="${event.image}" alt="${
        event.type
      }" data-id="${event.id}" />
      <div class="event-info">
        <div>${event.description}</div>
        <div>${event.extra1 || ""}</div>
        <div>${event.extra2 || ""}</div>
      </div>
    `;

      timeline.appendChild(eventEl);
    });
    // Evento clic en icono para mostrar imágenes
    document.querySelectorAll(".event-image").forEach((imgEl, index) => {
      imgEl.addEventListener("click", () => {
        // const eventId = data[index].id;
        const eventId = imgEl.dataset.id;

        // Quitar clase a todos
        document
          .querySelectorAll(".event-image")
          .forEach((img) => img.classList.remove("selected-event"));

        // Añadir clase al seleccionado
        imgEl.classList.add("selected-event");

        showCarouselImages(eventId);
      });
    });
  });

  
function showCarouselImages(eventId) {
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("carousel-track");
  track.innerHTML = ""; // Limpiar carrusel previo

  // // Quitar selección anterior
  // document.querySelectorAll(".event-image").forEach((img) => {
  //   img.classList.remove("selected-event");
  // });

  // // Seleccionar la imagen del evento actual
  // const selectedIcon = document.querySelector(
  //   `.event-image[data-id="${eventId}"]`
  // );
  // if (selectedIcon) {
  //   selectedIcon.classList.add("selected-event");
  // }
  

  // Asumimos que las imágenes están en una carpeta 'assets/eventos/'
  // Y se llaman por ejemplo: 2_1.jpg, 2_2.jpg, ..., hasta que deje de existir
  let imgIndex = 1;
  const maxTries = 10;
  let loaded = 0;

  for (let i = 1; i <= maxTries; i++) {
    const imgPath = `assets/eventos/${eventId}_${i}.png`;
    const img = new Image();
    img.src = imgPath;

    img.onload = () => {
      track.appendChild(img);
      carousel.style.display = "block";
      loaded++;
    };

    img.onerror = () => {
      // Si no hay más imágenes, se detendrá naturalmente
    };
  }

  // Ocultar carrusel si no hay imágenes tras 1 segundo
  setTimeout(() => {
    if (loaded === 0) carousel.style.display = "none";
  }, 1000);
}

// Botones de scroll manual
document.getElementById("carousel-left").addEventListener("click", () => {
  document
    .getElementById("carousel-track")
    .scrollBy({ left: -300, behavior: "smooth" });
});

document.getElementById("carousel-right").addEventListener("click", () => {
  document
    .getElementById("carousel-track")
    .scrollBy({ left: 300, behavior: "smooth" });
});

// Ocultar botones si es un dispositivo táctil
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  document.querySelectorAll(".carousel-btn").forEach((btn) => {
    btn.style.display = "none";
  });
}

const backBtn = document.getElementById("back-to-start");

document.querySelector(".timeline-wrapper").addEventListener("scroll", (e) => {
  backBtn.style.display = e.target.scrollLeft > 200 ? "block" : "none";
});

backBtn.addEventListener("click", () => {
  document
    .querySelector(".timeline-wrapper")
    .scrollTo({ left: 0, behavior: "smooth" });
});

// Mostrar imagen en pantalla completa
const fullscreenViewer = document.getElementById('fullscreen-viewer');
const fullscreenImg = fullscreenViewer.querySelector('img');

document.getElementById('carousel-track').addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    fullscreenImg.src = e.target.src;
    fullscreenViewer.style.display = 'flex';
  }
});

// Cerrar al hacer clic
fullscreenViewer.addEventListener('click', () => {
  fullscreenViewer.style.display = 'none';
  fullscreenImg.src = '';
});
